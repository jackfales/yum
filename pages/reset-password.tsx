import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { Auth } from 'aws-amplify';

function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState('');

  const passwordConstraints = {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 1,
  };

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)
    
    const username = formData.get("username").toString()
    const verificationCode = formData.get("verificationCode").toString()
    const newPassword = formData.get("newPassword").toString()

    // Validates password and submits the reset password request
    if (!isStrongPassword(newPassword, passwordConstraints)) {
      setErrorMessage("Password must be at least 8 characters long, contain one number, and one special character!")
    } else {
      try {
        await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
        router.push('/login');
      } catch(err) {
        setErrorMessage("Please make sure all entries are correct.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>YUM | Reset Password</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <main className='bg-cream-100 h-screen flex justify-center'>
        <div className='flex flex-col justify-center items-start w-80'>
          <h1 className='text-5xl tracking-tight font-bold mb-4'>Password Reset</h1>
          <h2 className='mb-6'>Enter your <span className='font-semibold'>username</span>, the <span className='font-semibold'>verification code</span> sent to your email, and your new <span className='font-semibold'>password</span>.</h2>
          <form onSubmit={onSubmit} className='w-full'>
            <p className='mb-2 text-red-400'>{errorMessage}</p>
            <label htmlFor='username' className='font-semibold'>Username:</label>
            <input type="text" name="username" className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
            <label htmlFor='verificationCode' className='font-semibold'>Verification Code:</label>
            <input type="text" name="verificationCode" className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
            <label htmlFor='newPassword' className='font-semibold'>New Password:</label>
            <input type="password" name="newPassword" className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
            <button type="submit" className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Submit</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
