import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { withSSRContext } from "aws-amplify";

/**
 * Creates a post with the given attributes
 */
export async function POST(request: Request) {
  // Checks if the request comes from an authenticated user
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  const { Auth } = withSSRContext({ req });

  try {
    await Auth.currentAuthenticatedUser();
  } catch (err) {
    return NextResponse.json(
      { error: "You do not have permission to access this resource" },
      { status: 401 },
    );
  }

  // Sends the request to the AWS API Gateway Endpoint and processes the response
  const payload: Object = Object.fromEntries(await request.formData());

  const res = await fetch(
    "https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/posts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  const body = JSON.parse(data["body"]);
  if (data.statusCode == 201) {
    return NextResponse.json(
      { url: `${body["url"]}` },
      { status: data.statusCode },
    );
  } else {
    const errorMessage = `${body["errorType"]}: ${body["errorMessage"][1]}`;
    return NextResponse.json(
      { error: errorMessage },
      { status: data.statusCode },
    );
  }
}
