import { withSSRContext } from 'aws-amplify';
import { headers } from 'next/headers';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { EditProfileAndFollowButton } from '../components/ClientUtilityFunctions';
import ProfilePost from '../components/ProfilePost';
import LoadMore from '../components/LoadMore';
/* TODO(SWE-65): Remove the imports below and static user data located at `./data` and
 * `./public/images` at once data is queried from the graphDB.
 */
import path from 'path';
import fs from 'fs';

export const metadata = {
  title: 'Dashboard',
};

const profileDirectory: string = path.join(process.cwd(), 'data');
/* TODO(SWE-65): Update generateStaticParams function to query the graphDB for all
 * existing users instead of searching the static files.
 */
/**
 * Returns all of the endpoints for the dynamic route
 *
 * @returns an array of objects where each object represents a dynamic route
 */
export async function generateStaticParams() {
  const fileNames: string[] = fs.readdirSync(profileDirectory);
  return fileNames.map((fileName) => {
    return {
      params: { user: fileName.replace(/\.json$/, '') },
    };
  });
}

/* TODO(SWE-65): Update getProfileData function to query the graphDB for the user data
 * in JSON format
 */
/**
 * Returns the profile data associated with the provided user
 *
 * @param id - the username
 * @returns The JSON object containing the number of followers, following,
 *          and posts associated with the user.
 */
export function getProfileData(id: string): any {
  const profilePath: string = path.join(profileDirectory, `${id}.json`);
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

export default async function Profile({
  params,
}: {
  params: { user: string };
}) {
  // TODO(SWE-25): Replace this authorization check with a check at the API gateway
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get('cookie'),
    },
  };

  const { Auth } = withSSRContext({ req });

  // Renders dashboard if logged in, else redirect to /login
  let username: String = '';
  let userId: String = '';
  try {
    const userData = await Auth.currentUserInfo();
    username = userData['username'];
    userId = userData['attributes']['sub'];
  } catch (err) {
    console.log(err);
  }

  const { user } = params;
  const { followers, following, postCount } = getProfileData(user);

  // Grab the user id belonging to the current profile page
  let res = await fetch(`http://localhost:3000/api/users?username=${user}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const profileId = (await res.json())['body']['id'][0];

  // Sends a request to load the initial posts
  const payload = { userIds: [profileId] };
  res = await fetch('http://localhost:3000/api/posts/users?page=0&pageSize=5', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  /*
   * Convert from an array of Post arrays to an array of Post objects, also
   * omitting unneccessary post information (recipe, ingredients, tags, etc.)
   */
  let posts: any = [];
  for (const post of (await res.json())['posts']) {
    const postObj = { imageUrl: post[0] };
    posts.push(postObj);
  }

  return (
    <>
      <Navbar username={username} userId={userId} />
      <main className="bg-cream-100 min-h-screen h-full flex items-start justify-center pt-14">
        <div className="flex-[0_1_670px] flex flex-col items-center">
          <div className="flex flex-row flex-nowrap justify-between items-center gap-2 w-full p-4 border-b">
            <Image
              className="w-[150px] h-[150px] rounded-full shadow-inner"
              src={`/images/pp/${user}.jpg`}
              alt="Picture of the user"
              width={150}
              height={150}
            />
            <div className="flex flex-col items-center h-full gap-1.5">
              <h1 className="text-2xl">{user}</h1>
              <div className="flex gap-4 justify-between">
                <p>
                  <span className="font-medium">{followers}</span> Followers
                </p>
                <p>
                  <span className="font-medium">{following}</span> Following
                </p>
                <p>
                  <span className="font-medium">{postCount}</span> Posts
                </p>
              </div>
              <EditProfileAndFollowButton
                user={user}
                isCurrentUser={username === user}
              />
            </div>
          </div>
          <div className="w-full my-1 md:my-3 grid grid-cols-3 gap-1">
            {posts.map((post, index) => (
              <ProfilePost imageUrl={post.imageUrl} key={index} />
            ))}
            <LoadMore ids={[profileId]} isDashboard={false} />
          </div>
        </div>
      </main>
    </>
  );
}
