import { CognitoIdentityProviderClient, SignUpCommand } 
  from '@aws-sdk/client-cognito-identity-provider';

// These variables should be set in the environment varibles
// But I am just going to explicity declare them for now
// const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;
const COGNITO_REGION = 'us-west-2';
const COGNITO_APP_CLIENT_ID = '7q994i31ra7iiq93qv0e074r91';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { username, password, lastName, firstName } = JSON.parse(req.body);

  const client = new CognitoIdentityProviderClient({
    region: COGNITO_REGION
  })

  const inputs = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: 'given_name',
        Value: firstName
      }, 
      {
        Name: 'family_name',
        Value: lastName
      },
      {
        Name: 'preferred_username',
        Value: username
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