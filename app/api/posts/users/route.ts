import { type NextRequest } from 'next/server'

/** 
 * Retrieves the Posts belonging to the set of users. 
 */
export async function POST(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const page: String | null = searchParams.get('page');
  const perPage: String | null = searchParams.get('perPage');
  const body = await request.json();

  // Forwards the request to the API Gateway which should return the post information for all the users
  

  return Response.json({message: "Hello!"});
}