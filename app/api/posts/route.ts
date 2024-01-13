import { NextResponse } from "next/server";
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '../../utils/amplifyServerUtils';
import { cookies } from 'next/headers';

/**
 * Creates a post with the given attributes
 */
export async function POST(request: Request) {
  // Checks if the request comes from an authenticated user
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec)
  });
  if (!user) {
    return NextResponse.json(
      {error: 'You do not have permission to access this resource'}, 
      {status: 401}
    );
  }
  
  console.log(user);

  const result = await uploadData({
    key: 'test.txt',
    data: 'Hello',
    options: {
      accessLevel: 'guest'
    }
  }).result;

  console.log(result);
  // Sends the request to the AWS API Gateway Endpoint and processes the response
  const payload: Object = (Object.fromEntries(await request.formData()));

  const res = await fetch('https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();

  const body = JSON.parse(data['body']);
  if (data.statusCode == 201) {
    return NextResponse.json({url: `${body['url']}`}, {status: data.statusCode});
  } else {
    const errorMessage = `${body['errorType']}: ${body['errorMessage'][1]}`;
    return NextResponse.json({error: errorMessage}, {status: data.statusCode})
  }
}