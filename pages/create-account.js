import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Account() {
  const [inputErrorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInputs = {}
    const formData = new FormData(e.target);

    // Validation criteria for each field
    formData.forEach((input, field) => {
      userInputs[field] = input;
      let errorMessage;
      switch (field) {
        case 'firstName':
          errorMessage = input.length === 0 ?
            'Please provide a first name!' : '';
          break;
        case 'lastName':
          errorMessage = input.length === 0 ?
            'Please provide a last name!' : '';
          break;
        case 'username':
          errorMessage = input.length < 5 ? 
            'Username must be at least 5 characters long!' : '';
          break;
        case 'password':
          errorMessage = input.length < 5 ?
            'Password must be at least 6 characters long!' : '';
          break;
        case 'confirmPassword':
          errorMessage = formData.get('password') !== input ?
            'Passwords do not match!' : '';
          errorMessage = input.length === 0 ?
            'Please confirm your password!' : errorMessage;
          break;
        default:
          errorMessage = '';
          break;
      }
      setErrorMessages((prevError) => ({...prevError, [field]: errorMessage}));
      console.log(`${field}: ${input}`);
    });

    await fetch('./api/create-account', {
      method: 'POST',
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(userInputs),
    })   
      .then(response => response.json())
      .then(response => console.log(response));
  }
  
  return (
    <div>
      <Head>
          <title>Create Account</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='firstName'>First name:</label>
            <input type='text' name='firstName'/>
            <div className='error'>{inputErrorMessages.firstName}</div>
          </div>
          <div>
            <label htmlFor='lastName'>Last name:</label>
            <input type='text' name='lastName'/>
            <div className='error'>{inputErrorMessages.lastName}</div>
          </div>
          <div>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username'/>
            <div className='error'>{inputErrorMessages.username}</div>
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password'/>
            <div className='error'>{inputErrorMessages.password}</div>
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input type='password' name='confirmPassword'/>
            <div className='error'>{inputErrorMessages.confirmPassword}</div>
          </div>
          <button type='submit'>Create Account</button>
        </form>
      </main>
      <style jsx>{`
        label {
          display: block;
          font-size: 18px;
        }

        form {
          padding: 30px;
          width: 300px;
        }

        input, button {
          width: 100%;
          height: 25px;
        }

        .error {
          text-wrap: wrap;
          height: 45px;
          color: #FA535E;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}