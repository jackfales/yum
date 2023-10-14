import Image from 'next/image';
import styles from "../../styles/Profile.module.css"
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
    <main id={styles['main']}>
      <div id={styles['profilebanner']} className={`${styles.container} ${styles.column}`}>
        <div id={styles['profileheader']} 
             className={`${styles.container} 
                         ${styles.row} 
                         ${styles.spacebetween}`}>
          <Image
            id={styles['profilepicture']}
            src={`/images/pp/${user}.jpg`}
            alt="Picture of the user"
            width={100}
            height={100}
          />
          <h1>{user}</h1>
        </div>
        <div id={styles['profileinfo']} 
             className={`${styles.container} 
             ${styles.row} 
             ${styles.spacebetween}`}>
          <p>Followers: {followers}</p>
          <p>Following: {following}</p>
          <p>Post Count: {postCount}</p>
        </div>
      </div>
    </main>
  )
}