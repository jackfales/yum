import { Auth } from 'aws-amplify'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    let username = formData.get("username")
    let password = formData.get("password")

    // Validates user inputted data and generates error messages
    // TODO: Change input.length to validator.isEmpty() for consistency
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Please enter both a Username and Password.")
      return
    } else {
      setErrorMessage("")
    }

    console.log("Username: %s", username)
    console.log("Password: %s", password)

    try {
      await Auth.signIn(username, password);
      router.push(`/dashboard`);
    } catch (error) {
      setErrorMessage(error.toString());
    }
  }

  return (
    <>
      <Head>
        <title>YUM | Login</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <main className='bg-cream-100 h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-start w-80'>
          <h1 className='text-5xl tracking-tight font-bold mb-4'>Log in to Yum</h1>
          <form onSubmit={onSubmit} className='w-full'>
            <p className='mb-2 text-red-400'>{errorMessage}</p>
            <label htmlFor='username' className='font-semibold'>Username:</label>
            <input type="text" name="username" className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
            <label htmlFor='password' className='font-semibold'>Password:</label>
            <input type="password" name="password" className='w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md'/>
            <button type="submit" className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
