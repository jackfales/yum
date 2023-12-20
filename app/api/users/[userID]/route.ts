import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { withSSRContext } from "aws-amplify";

const neptune_url = "https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users/"

export async function GET(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID

  const res = await fetch(`${neptune_url}${userID}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}

export async function PUT(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID
  var response = "Request Failed"

  await request.json()
  .then( async data => {

    const res = await fetch(`${neptune_url}${userID}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    response = await res.json();
  })
  return NextResponse.json({response})
}


export async function DELETE(request: Request, { params }: { params: { userID: string } }) {
  // Checks if the request comes from an authenticated user
  const userID = params.userID

  const res = await fetch(`${neptune_url}${userID}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}