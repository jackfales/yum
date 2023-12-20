import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModal";
import Post from "../components/Post";
import LoadMore from "../components/LoadMore";
/* TODO: Remove the imports below and static post data located at `./data/posts.json` 
* once data is queried from relational database.
*/
import path from 'path';
import fs from 'fs';
import fetchPosts from "../utils/fetchPosts"

export const metadata = {
  title: 'Dashboard'
}

//TODO: Remove these constants as these were for the static data
const testDataPath: string = path.join(process.cwd(), 'data/posts.json');
const testData: Object[] = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

export default async function Dashboard() {
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

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
    <main className='bg-cream-100 flex items-center justify-center pt-14'>
      <div className='flex-[0_1_670px] flex flex-col items-center'>
        <CreatePostModal/>
        {
          fetchPosts(0, testData).map((post, index) => (
            <Post name={post['name']} key={index}></Post>
          ))
        }
        <LoadMore postsData={testData}/>
      </div>
    </main>
  </>
  )
}