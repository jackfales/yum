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
  const data: Object = (Object.fromEntries(await request.formData()));

  const res = await fetch('https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/post', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  console.log(await res.json());

  return NextResponse.json(res);
}