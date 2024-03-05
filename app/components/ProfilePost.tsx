'use client';
import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';

export default function ProfilePost({ imageUrl }: { imageUrl: string }) {
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

  /*
   * Retrieves image on initial render
   */
  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedUrl = await Storage.get(imageUrl);
        setPostImage(signedUrl);
      } catch (err) {
        console.log(`Error retrieving image: ${err}`);
      }
    }

    getImageFromStorage();
  }, []);

  return (
    <>
      <a className="aspect-square">
        <img className="w-full h-full object-cover" src={postImage} />
      </a>
    </>
  );
}
