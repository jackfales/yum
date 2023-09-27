import { CognitoIdentityProviderClient, SignUpCommand } 
  from '@aws-sdk/client-cognito-identity-provider';
// To parse through formData, may be better to send a JSON object
import formidable from 'formidable';

// These variables should be set in the environment varibles
// But I am just going to explicity declare them for now
// const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;
const COGNITO_REGION = 'us-west-2';
const COGNITO_APP_CLIENT_ID = '56mmq1d2g0so80bd6jioq0umrb';

// Need to disable built-in body parser for formidable
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  // Parse the formData from the requestBody
  const form = formidable({multiples: true});
  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ fields });
    });
  });

  const client = new CognitoIdentityProviderClient({
    region: COGNITO_REGION
  })

  const inputs = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Password: data.fields.password[0],
    Username: data.fields.username[0],
    UserAttributes: [
      {
        Name: 'given_name',
        Value: data.fields.firstName[0]
      }, 
      {
        Name: 'family_name',
        Value: data.fields.lastName[0]
      },
      {
        Name: 'preferred_username',
        Value: data.fields.username[0]
      }
    ]
  }

  const command = new SignUpCommand(inputs);

  try {
    const response = await client.send(command);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log("My error is " + err);
    return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
  }
}