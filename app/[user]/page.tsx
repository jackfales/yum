import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import { EditProfileAndFollowButton } from "../components/ClientUtilityFunctions";
// TODO These imports may not be needed when we implement a database
import path from 'path';
import fs from 'fs';

export const metadata = {
  title: 'Dashboard'
}

const profileDirectory: string = path.join(process.cwd(), 'data');

/**
 * Returns all of the endpoints for the dynamic route
 * 
 * @returns an array of objects where each object represents a dynamic route
 */
export async function generateStaticParams() {
  const fileNames: string[] = fs.readdirSync(profileDirectory);
  return fileNames.map((fileName) => {
    return { 
      params: { user: fileName.replace(/\.json$/, '') }
    }
  })
}

/**
 * Returns the profile data associated with the provided user
 * 
 * @param id - the username
 * @returns The JSON object containing the number of followers, following,
 *          and posts associated with the user.
 */
export function getProfileData(id: string): any {
  const profilePath: string = path.join(profileDirectory,`${id}.json`);
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}


export default async function Profile({ params }: { params: {user: string}}) {
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  // Passes client-side credentials to server via cookies
  const { Auth } = withSSRContext({ req });

  let currUser
  try {
    const data = await Auth.currentAuthenticatedUser();
    currUser = data.username;
  } catch(err) {
    console.log(err);
  }

  const { user } = params;
  const { followers, following, postCount } = getProfileData(user);

  return (<>
    <Navbar username={currUser}/>
    <main className='flex items-center justify-center mt-14'>
      <div className='flex-[0_1_670px] flex flex-col items-center'>
        <div className='flex flex-row flex-nowrap justify-between items-center gap-2 w-full p-4 border-b'>
          <Image
              className='w-[150px] h-[150px] rounded-full shadow-inner'
              src={`/images/pp/${user}.jpg`}
              alt="Picture of the user"
              width={150}
              height={150}          
          />
          <div className='flex flex-col items-center h-full gap-1.5'>
            <h1 className='text-2xl'>{user}</h1>
            <div className='flex gap-4 justify-between'>
              <p><span className='font-medium'>{followers}</span> Followers</p>
              <p><span className='font-medium'>{following}</span> Following</p>
              <p><span className='font-medium'>{postCount}</span> Posts</p>
            </div>
            <EditProfileAndFollowButton user={currUser} isUser={currUser === user}/>
          </div>
        </div>
      </div>
    </main>
  </>
  )
}
