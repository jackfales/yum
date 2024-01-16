import { type NextRequest, NextResponse } from 'next/server'

/** 
 * Retrieves the Posts belonging to the set of users. 
 */
export async function POST(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const page: String | null = searchParams.get('page');
  const pageSize: String | null = searchParams.get('pageSize');
  const body = await request.json();

  // Forwards the request to the API Gateway which should return the post information for all the users
  const res = await fetch(`https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/posts/{users+}?page=${page}&pageSize=${pageSize}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const response = await res.json();
  return NextResponse.json({posts: response['posts']}, {status: response.statusCode});
}