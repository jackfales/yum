import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModal";
import Post from "../components/Post";
import LoadMore from "../components/LoadMore";
// TODO: Imports below are used to read test data, delete when DB is implemented
import path from 'path';
import fs from 'fs';

export const metadata = {
  title: 'Dashboard'
}

const testDataPath: string = path.join(process.cwd(), 'data/posts.json');
const testData: Object[] = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

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
  
  // Sends a request for the initial posts
  const payload = { "userIds": ['dtran', 'jfales', 'sfales'] };
  const res = await fetch('http://localhost:3000/api/posts/users?page=0&pageSize=5', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  const posts = (await res.json())['posts'];

  return (<>
    <Navbar username={username}></Navbar>
    <main className='bg-cream-100 flex items-center justify-center pt-14'>
      <div className='flex-[0_1_670px] flex flex-col items-center'>
        <CreatePostModal/>
        {
          posts.map((post, index) => (
            <Post imageUrl={post[0]} title={post[1]} createdBy={post[6]} key={index}></Post>
          ))
        }
        <LoadMore postsData={testData}/>
      </div>
    </main>
  </>
  )
}