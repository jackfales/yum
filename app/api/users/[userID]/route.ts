import { NextResponse } from "next/server";

const neptune_url = "https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users/"

/**
 * Retrieves user information associated with a specific user
 */
export async function GET(request: Request, { params }: { params: { userID: string } }) {
  const userID = params.userID

  const res = await fetch(`${neptune_url}${userID}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  
  const response = await res.json();

  return NextResponse.json({body: response},
                           {status: res.status})
}
/**
 * Modifies attributes of a specific user if the user exists
 */
export async function PUT(request: Request, { params }: { params: { userID: string } }) {
  const userID = params.userID

  var response = {}
  var statusCode = 500

  await request.json()
  .then( async data => {

    const res = await fetch(`${neptune_url}${userID}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    response = await res.json()
    statusCode = res.status
    
  })
  return NextResponse.json({body: response},
                           {status: statusCode})
}
/**
 * Deletes all attributes associated with a specific user
 */
export async function DELETE(request: Request, { params }: { params: { userID: string } }) {
  const userID = params.userID

  const res = await fetch(`${neptune_url}${userID}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  
  const response = await res.json();
  return NextResponse.json({body: response},
                           {status: res.status})
}