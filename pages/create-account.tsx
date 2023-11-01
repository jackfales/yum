import Head from 'next/head';
import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
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
    minLength: 6,        // Minimum length of 6 characters
    minLowercase: 0,      // Minimum 0 lowercase letters
    minUppercase: 0,      // Minimum 0 uppercase letters
    minNumbers: 1,       // Minimum 1 numeric digits
    minSymbols: 1,       // Minimum 1 special character
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userInputs = {};
    const errors : { [key: string]: string } = {};
    
    // Validation criteria for each field
    formData.forEach((input, field) => {
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
        case 'email':
          errorMessage = !isEmail(input) ?
            'Please provide a valid email!' : '';
          break;
        case 'username':
          errorMessage = input.length < 5 ? 
            'Username must be at least 5 characters long!' : '';
          break;
        case 'password':
          errorMessage = !isStrongPassword(input, passwordConstraints)?
            'Password must be at least 6 characters long and contain one special character!' : '';
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
      userInputs[field] = input;
      errors[field] = errorMessage;
      console.log(`${field}: ${input}`);
    });
    // Update the error messages, telling React to re-render the component
    setErrorMessages({"confirmPassword" : errors["confirmPassword"],
                      "email" : errors["email"],
                      "firstName" : errors["firstName"],
                      "lastName" : errors["lastName"],
                      "password" : errors["password"],
                      "username" : errors["username"]
                      });

    // Check if the form has any errors
    const hasNoErrors = Object.values(errors)
                                .every((input) => input === '');

    const username = formData.get("username").toString()
    const password = formData.get("password").toString()
    const email = formData.get("email")
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")

    if (hasNoErrors) {
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
    <div>
      <Head>
          <title>YUM | Create Account</title>
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
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email'/>
            <div className='error'>{inputErrorMessages.email}</div>
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