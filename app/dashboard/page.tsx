import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModal";
import Post from "../components/Post";
import LoadMore from "../components/LoadMore";
import styles from "../../styles/Dashboard.module.css";
// TODO: Imports below are used to read test data, delete when DB is implemented
import path from 'path';
import fs from 'fs';

export const metadata = {
  title: 'Dashboard'
}

const testDataPath: string = path.join(process.cwd(), 'data/posts.json');
const testData: Object[] = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

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
function fetchPosts(page: number): Object[] {
  const perPage = 5;
  const posts = testData.slice(perPage * page, perPage * page + perPage);
  return posts;
}

export default async function Dashboard() {
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  // Passes client-side credentials to server via cookies
  const { Auth } = withSSRContext({ req });

  // Renders dashboard if logged in, else redirect to /login
  let username: String;
  try {
    const data = await Auth.currentAuthenticatedUser();
    ({ username } = data);
  } catch(err) {
    console.log(err);
    redirect('/login');
  }
  
  return (<>
    <Navbar username={username}></Navbar>
    <main id={styles.main} className={`${styles.container} ${styles.center}`}>
      <div id={styles.column}>
        {
          fetchPosts(0).map((post, index) => (
            <Post name={post['name']} key={index}></Post>
          ))
        }
        <LoadMore postsData={testData}/>
        <CreatePostModal/>
      </div>
    </main>
  </>
  )
}