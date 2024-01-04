import { NextResponse } from "next/server";

const neptune_url = "https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users"
/**
 * Creates a user given specific user attributes
 */
export async function POST(request: Request) {

  var response = {"body" : "Server error",
                  "statusCode" : 500}

  await request.json()
  .then( async data => {

    const res = await fetch(`${neptune_url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    response = await res.json();
  })
  return NextResponse.json({body: response.body},
                           {status: response.statusCode})
}