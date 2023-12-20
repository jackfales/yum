/* TODO:
* This function should be an Route Handler that:
*   1. Queries the graphDB for all the users that specified user follows
*     a. The graph query should look something like:
*        g.V().has("username", "dtran").out("follows").id()
*   2. Queries the relationalDB for all the posts belonging to the followed users (chronologically)
*     a. The relational query should look something like:
*        SELECT * FROM posts
*        WHERE (created_by = [followed user_ids])
*        ORDER BY created_at DESC
*        LIMIT 5
*        OFFSET (pageNum * 5);
*/

/**
 * Returns the Post data for the five posts belonging to the specified page
 * 
 * ex: fetchPosts(0) returns post data for Posts #1-5
 *     fetchPosts(1) returns post data for Posts #6-10
 * @param page - the page number
 * @returns an array of Post JSON data
 */
export default function fetchPosts(page: number, postData: Object[]): Object[] {
  const perPage = 5;
  const posts = postData.slice(perPage * page, perPage * page + perPage);
  return posts;
}