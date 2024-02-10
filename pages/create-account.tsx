import Head from 'next/head';
import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify'

export default function CreateAccount() {
  const [inputErrorMessages, setErrorMessages] = useState({
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  });

  const passwordConstraints = {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 1,
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const errors : { [key: string]: string } = {};
    
    // Validates user inputted account data and generates error messages
    formData.forEach((input, field) => {
      let errorMessage;
      switch (field) {
        // TODO(SWE-59): Change input.length to validator.isEmpty() or .isLength() for consistency
        case 'firstName':
          errorMessage = isEmpty(input)?
            'Please provide a first name!' : '';
          break;
        case 'lastName':
          errorMessage = isEmpty(input) ?
            'Please provide a last name!' : '';
          break;
        case 'email':
          errorMessage = !isEmail(input) ?
            'Please provide a valid email!' : '';
          break;
        case 'username':
          errorMessage = !isLength(input, {min:5, max: 30}) ? 
            'Username must be at least 5 characters long!' : '';
          break;
        case 'password':
          errorMessage = !isStrongPassword(input, passwordConstraints)?
            'Password must be at least 8 characters long, contain one number, and one special character!' : '';
          break;
        case 'confirmPassword':
          errorMessage = formData.get('password') !== input ?
            'Passwords do not match!' : '';
          errorMessage = isEmpty(input) ?
            'Please confirm your password!' : errorMessage;
          break;
        default:
          errorMessage = '';
          break;
      }
      errors[field] = errorMessage;
      console.log(`${field}: ${input}`);
    });
    setErrorMessages({"confirmPassword" : errors["confirmPassword"],
                      "email" : errors["email"],
                      "firstName" : errors["firstName"],
                      "lastName" : errors["lastName"],
                      "password" : errors["password"],
                      "username" : errors["username"]
                      });  
    // Submits user inputted post data if there are no errors
    const hasNoErrors = Object.values(errors)
                                .every((input) => input === '');
    /* TODO(SWE-59): Separate backend from frontend. The following code should be 
     * refactored to a Route Handler. 
     * Similar to what is done in `./app/components/CreatePostModal.tsx`
     */        

    if (hasNoErrors) {
      const username : any = formData.get("username")!.toString()
      const password : any = formData.get("password")!.toString()
      const email : any = formData.get("email")!.toString()
      const firstName : any = formData.get("firstName")!.toString()
      const lastName : any = formData.get("lastName")!.toString()
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
            family_name: lastName,
            given_name: firstName,
            preferred_username: username
          }
        });
        router.push('/verify-email');
      } catch (err) {
        console.log(err.toString())
      }
    }
  }
  
  return (
    <>
      <Head>
          <title>YUM | Create Account</title>
      </Head>
      <main className='bg-cream-100 h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-start gap-14 w-80'>
          <h1 className='text-5xl tracking-tight font-bold self-center'>Sign up to start cooking!</h1>
          <form onSubmit={handleSubmit} className='flex flex-col items-start gap w-full'>
            <label htmlFor='firstName' className='font-semibold'>First name:</label>
            <input type='text' name='firstName' placeholder='John' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.firstName}</div>

            <label htmlFor='lastName' className='font-semibold'>Last name:</label>
            <input type='text' name='lastName' placeholder='Smith' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.lastName}</div>


            <label htmlFor='email' className='font-semibold'>Email:</label>
            <input type='text' name='email' placeholder='name@domain.com' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.email}</div>

            <label htmlFor='username' className='font-semibold'>Username:</label>
            <input type='text' name='username' placeholder='johnsmith2023' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.username}</div>

            <label htmlFor='password' className='font-semibold'>Password:</label>
            <input type='password' name='password' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.password}</div>

            <label htmlFor='confirmPassword' className='font-semibold'>Confirm Password:</label>
            <input type='password' name='confirmPassword' className='w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md'/>
            <div className='mb-2 text-red-400'>{inputErrorMessages.confirmPassword}</div>

            <button type='submit' className='my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center'>Sign up</button>
          </form>
        </div>
      </main>
    </>
  )
}