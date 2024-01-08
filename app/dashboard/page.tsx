import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModal";
import Post from "../components/Post";
import LoadMore from "../components/LoadMore";

export const metadata = {
  title: 'Dashboard'
}

export default async function Dashboard() {
  // Checks if the request comes from an authenticated user
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
  
  // TODO(SWE-67): Grab posts from following users
  // Sends a request to load the initial posts
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
      <div className='flex-[0_1_670px] flex flex-col items-center pb-7'>
        <CreatePostModal/>
        {
          posts.map((post, index) => (
            <Post imageUrl={post[0]} title={post[1]} createdBy={post[6]} key={index}></Post>
          ))
        }
        <LoadMore/>
      </div>
    </main>
  </>
  )
}