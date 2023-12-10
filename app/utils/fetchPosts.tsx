/* TODO: This function should be an API Route that requests post from the user's 
* followed chefs by querying the database. The query would return the data in
* chronological order
*
* The query shoud look something like this:
* SELECT * FROM posts 
* WHERE (user_id = [followed user ids]) 
* ORDER BY created_at DESC
* LIMIT 5
* OFFSET (pageNum * 5);
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