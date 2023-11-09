import { NextResponse } from "next/server"

type Data = {
  url?: string,
  name?: string,
  caption?: string,
  recipe?: string,
  ingredients?: string,
  tags?: string
}

export async function POST(request: Request) {  
  const body = await request.json();
  
  // TODO: Perform some validation prior to submission?

  const res = await fetch('https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/post', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  return NextResponse.json(res);
}