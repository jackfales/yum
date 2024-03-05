import { type NextRequest, NextResponse } from 'next/server';

const neptune_url =
  'https://dzcmprdreb.execute-api.us-west-2.amazonaws.com/api/users';

/**
 * Creates a user given specific user attributes
 */
export async function POST(request: Request) {
  var response = { body: 'Server error', statusCode: 500 };

  await request.json().then(async (data) => {
    const res = await fetch(`${neptune_url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    response = await res.json();
  });
  return NextResponse.json(
    { body: response.body },
    { status: response.statusCode },
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let url;

  // Forwards the request to the correct API Gateway endpoint
  if (searchParams.has('username')) {
    url = `${neptune_url}?username=${searchParams.get('username')}`;
  } else if (searchParams.has('userId')) {
    url = `${neptune_url}?userId=${searchParams.get('userId')}`;
  } else {
    return NextResponse.json(
      { error: 'Please provide a username or user id.' },
      { status: 500 },
    );
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const response = await res.json();

  return NextResponse.json({ body: response }, { status: res.status });
}
