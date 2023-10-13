import Image from 'next/image';
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