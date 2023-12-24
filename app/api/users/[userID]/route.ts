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
  
  const data = await res.json();
  return NextResponse.json({data})
}
/**
 * Modifies attributes of a specific user if the user exists
 */
export async function PUT(request: Request, { params }: { params: { userID: string } }) {
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
/**
 * Deletes all attributes associated with a specific user
 */
export async function DELETE(request: Request, { params }: { params: { userID: string } }) {
  const userID = params.userID

  const res = await fetch(`${neptune_url}${userID}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  
  const data = await res.json();
  return NextResponse.json({data})
}