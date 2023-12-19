import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { withSSRContext } from "aws-amplify";

export async function POST(request: Request) {
  // Checks if the request comes from an authenticated user

  // TODO: parse form data and send appropriate API request
  const payload: Object = (Object.fromEntries(await request.formData()));

  const res = await fetch('https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });

  const data = await res.json();
}