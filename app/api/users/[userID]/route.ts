import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { withSSRContext } from "aws-amplify";

export async function GET(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID

  const res = await fetch(`https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users/${userID}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}

export async function PUT(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID

  // TODO: parse form data and send appropriate API request
  const payload: Object = (Object.fromEntries(await request.formData()));

  const res = await fetch(`https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users${userID}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}


export async function DELETE(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID

  const res = await fetch(`https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users/${userID}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}