import Head from 'next/head';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

export default function ConfirmSignUp() {
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get("username")?.toString()
        const confirmationCode = formData.get("confirmationCode")?.toString()

        if (!!!username || !!!confirmationCode) {
          setErrorMessage('Please provide your username and confirmation code.');
        } else {
            try {
              await Auth.confirmSignUp(username, confirmationCode);
              router.push("/login");
            } catch (error) {
              setErrorMessage(error.toString());
            }
        }
    }

    return (
        <>
          <Head>
              <title>YUM | Confirm Account</title>
          </Head>

          <main className='bg-cream-100 h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-start w-80'>
              <h1 className='text-5xl tracking-tight font-bold mb-4'>Email Confirmation</h1>
              <form onSubmit={handleSubmit} className='w-full'>
                <p className='mb-2 text-red-400'>{errorMessage}</p>
                <label htmlFor='username' className='font-semibold'>Username:</label>
                <input type='text' name='username' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
                <label htmlFor='confirmationCode' className='font-semibold'>Confirmation Code:</label>
                <input type='text' name='confirmationCode' className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
                <button type='submit' className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Confirm Account</button>
              </form>
            </div>
          </main>
        </>
      )

}