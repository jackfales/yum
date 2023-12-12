'use client'
import { FormEvent } from 'react';

export default function EditProfileForm() {
  /**
   * Submits form data
   * 
   * @param e - the form submit event
  */
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData: Object = Object.fromEntries((new FormData(e.currentTarget)));
    console.log(JSON.stringify(formData));
  }
  
  return (
    <>
        <form onSubmit={onSubmitHandler} className='w-full'>
              <label htmlFor='profilePicture' className='font-semibold'>Profile Picture:</label>
              <input type='file' name='profilePicture' className='w-full mb-2'/>
              <label htmlFor='firstName' className='font-semibold'>First Name:</label>
              <input type='text' name='firstName' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='lastName' className='font-semibold'>Last Name:</label>
              <input type='text' name='lastName' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='username' className='font-semibold'>Username:</label>
              <input type='text' name='username' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='gender' className='font-semibold'>Gender:</label>
              <input type='text' name='gender' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
              <label htmlFor='bio' className='font-semibold'>Bio:</label>
              <input type='text' name='bio' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>   
            <button type='submit' className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Save Changes</button>
        </form>
    </>
  )
}