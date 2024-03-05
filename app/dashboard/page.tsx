import { withSSRContext } from 'aws-amplify';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import CreatePostModal from '../components/CreatePostModal';
import Post from '../components/Post';
import LoadMore from '../components/LoadMore';

export const metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  // Checks if the request comes from an authenticated user
  const req = {
    headers: {
      cookie: headers().get('cookie'),
    },
  };

  const { Auth } = withSSRContext({ req });

  // Renders dashboard if logged in, else redirect to /login
  let username: String;
  let userId: String;
  try {
    const userData = await Auth.currentUserInfo();
    username = userData['username'];
    userId = userData['attributes']['sub'];
  } catch (err) {
    console.log(err);
    redirect('/login');
  }

  // TODO(SWE-67): Grab posts from following users
  // Sends a request to load the initial posts
  const ids = ['e9303322-6084-4c8a-a264-a072dca649fb'];
  const payload = { userIds: ids };
  const res = await fetch(
    'http://localhost:3000/api/posts/users?page=0&pageSize=5',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );

  /*
   * Convert from an array of Post arrays to an array of Post objects, also
   * omitting unneccessary post information (recipe, ingredients, tags, etc.)
   */
  let posts: any = [];
  for (const post of (await res.json())['posts']) {
    const postObj = { imageUrl: post[0], title: post[1], createdBy: post[6] };
    posts.push(postObj);
  }

  return (
    <>
      <Navbar username={username} userId={userId}></Navbar>
      <main className="bg-cream-100 min-h-screen flex justify-center pt-14">
        <div className="flex-[0_1_670px] flex flex-col items-center pb-7">
          <CreatePostModal />
          {posts.map((post, index) => (
            <Post
              imageUrl={post.imageUrl}
              title={post.title}
              createdBy={post.createdBy}
              key={index}
            ></Post>
          ))}
          <LoadMore ids={ids} isDashboard={true} />
        </div>
      </main>
    </>
  );
}
