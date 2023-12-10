import { headers } from 'next/headers';
import { NextResponse } from "next/server";
import { withSSRContext } from "aws-amplify";

export async function PUT(request: Request) {
  // Checks if the request comes from an authenticated user
  const req = {
    headers: {
      cookie: headers().get("cookie")
    },
  };

  const { Auth } = withSSRContext({ req });

  try {
    await Auth.currentAuthenticatedUser();
  } catch(err) {
    return NextResponse.json(
      {error: 'You do not have permission to access this resource'}, 
      {status: 401}
    );
  }

  // TODO: parse form data and send appropriate API request
  const payload: Object = (Object.fromEntries(await request.formData()));

  const res = await fetch('https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();

  const body = data['body']
  if (data.statusCode == 200) {
    return NextResponse.json({result: `${body}`}, {status: data.statusCode});
  } else {
    const errorMessage = `${body['errorType']}: ${body['errorMessage'][1]}`;
    return NextResponse.json({error: errorMessage}, {status: data.statusCode})
  }
}