'use client'
import ProfileIcon from "./ProfileIcon";
import { Varela_Round } from "next/font/google";
import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";

const varela_round = Varela_Round({
  subsets: ['latin'],
  weight: ['400']
})

export default function Post({imageUrl, title, createdBy}: {imageUrl: string, title: String, createdBy: String}) {
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  
  /*
   * Retrieves image and username on initial render
   */
  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedUrl = await Storage.get(imageUrl);
        setPostImage(signedUrl);
      } catch (err) {
        console.log(`Error retrieving image: ${err}`)
      }
    }

    async function getUsernameFromId() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${createdBy}`, { method: 'GET' });
        const result = await response.json();
        const name = result['body']['username'][0];
        setUsername(name);
      } catch (err) {
        console.log(`Error retrieving user`)
      }
    }

    getImageFromStorage();
    getUsernameFromId();
  }, []);

  return (<>
    <div className={`${varela_round.className} w-full flex flex-col border border-solid border-gray-200 rounded-lg bg-white my-5 transition ease-in-out duration-500 hover:shadow-xl`}>
      <div className='flex justify-between items-center h-14 px-5'>
        <div className='flex-auto text-2xl'>{title}</div>
      </div>
      <div className='w-full min-h-[400px] overflow-hidden'>
        <img className='w-full h-full object-cover' src={postImage}/>
      </div>
      <div className='flex justify-between items-center h-14 px-5'>
        <div className='flex gap-2.5 items-center text-lg'>
          <ProfileIcon username={`${username}`} userId={`${createdBy}`}/>
          <span>{username}</span>
        </div>
        <div className='flex gap-2.5 items-center'>
          <div className='flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400'>L</div>
          <div className='flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400'>C</div>
          <div className='flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400'>S</div>
        </div>
      </div>
    </div>
  </>
  )
}