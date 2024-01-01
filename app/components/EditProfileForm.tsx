'use client'
import { FormEvent } from 'react';
import { redirect } from 'next/navigation';

export default function EditProfileForm({userData}) {

  const firstName = userData['data'][0]['firstName'][0]
  const lastName = userData['data'][0]['lastName'][0]
  const username = userData['data'][0]['username'][0]
  const gender = userData['data'][0]['gender'][0]
  const bio = userData['data'][0]['bio'][0]

  const userInfo = {
    'firstName' : firstName,
    'lastName' : lastName,
    'username' : username,
    'gender' : gender,
    'bio' : bio
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Object = Object.fromEntries((new FormData(e.currentTarget)));
    
    let attributes = {};

    for (const [key, value] of Object.entries(formData)) {
      // TODO: Add support for profile picture
      if (key === "profilePicture") {
        continue;
      }
      // If the value is the same, don't add to the request
      if (userInfo[key] === value) {
        continue;
      } else {
        attributes[key] = value;
      }
    }

    const payload = {
      "method" : "PUT",
      "attributes" : attributes
    }

    const res = await fetch(`http://localhost:3000/api/users/${username}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });

    const data = await res.json();
    console.log(data)

    redirect("/dashboard");
  }
  
  return (
    <>
        <form onSubmit={onSubmitHandler} className='w-full'>
              <label htmlFor='profilePicture' className='font-semibold'>Profile Picture:</label>
              <input type='file' name='profilePicture' className='w-full mb-2'/>
              <label htmlFor='firstName' className='font-semibold'>First Name:</label>
              <input type='text' placeholder = {firstName} name='firstName' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='lastName' className='font-semibold'>Last Name:</label>
              <input type='text' placeholder = {lastName} name='lastName' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='username' className='font-semibold'>Username:</label>
              <input type='text' placeholder = {username} name='username' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='gender' className='font-semibold'>Gender:</label>
              <input type='text' placeholder = {gender} name='gender' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='bio' className='font-semibold'>Bio:</label>
              <input type='text' placeholder = {bio} name='bio' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
            <button type='submit' className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Save Changes</button>
        </form>
    </>
  )
}