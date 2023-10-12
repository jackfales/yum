import Image from 'next/image';
// These imports just for grabbing the static data - these should be removed
import path from 'path';
import fs from 'fs';

export const metadata = {
  title: 'Dashboard'
}

const profileDirectory: string = path.join(process.cwd(), 'data');

// Grab all users, this would probably query the user database
export async function generateStaticParams() {
  const fileNames: string[] = fs.readdirSync(profileDirectory);
  return fileNames.map((fileName) => {
    return { 
      params: { user: fileName.replace(/\.json$/, '') }
    }
  })
}

// Grabs profile data associated with user, probably another query
export function getProfileData(id: string) {
  const profilePath: string = path.join(profileDirectory,`${id}.json`);
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

export default async function Profile({ params }: { params: {user: string}}) {
  const { user } = params;
  const { followers, following, postCount } = getProfileData(user);
  return (
    <>
      <Image
        src={`/images/pp/${user}.jpg`}
        alt="Picture of the user"
        width={200}
        height={200}
      />
      <h1>Hi this is {user}</h1>
      <ul>
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Post Count: {postCount}</li>
      </ul>
    </>
  )
}