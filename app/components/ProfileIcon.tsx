'use client'

import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";

export default function ProfileIcon({username, userId}: {username: String, userId: String}) {
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getProfilePictureFromStorage() {
      try {
        const signedUrl = await Storage.get(`${userId}/pfp`);
        setProfilePicture(signedUrl);
      } catch (err) {
        console.log(`Error retrieving image: ${err}`)
      }
    }

    getProfilePictureFromStorage();
  }, []);

  return (<>
    <a className='w-10 h-10 rounded-full' href={`/${username}`}>
        <img className='w-10 h-10 rounded-full'
          src={profilePicture}
          alt="Picture of the user"
          width={40}
          height={40}
      />
    </a>
  </>
  )
}