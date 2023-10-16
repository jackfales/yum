import Head from 'next/head';
import isEmail from 'validator/lib/isEmail';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';

function ForgotPassword () {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target)

    const email = formData.get("email").toString()

    // TODO implement email format checking
    if (email.length === 0 || !isEmail(email)) {
        setErrorMessage("Please enter a valid email.")
        return
    } else {
        setErrorMessage("")
    }

    // Send a request to initiate the password reset process
    // Send confirmation code to user's email

    try {
      await Auth.forgotPassword(email);
      router.push('/reset-password');
    } catch(err) {
      setErrorMessage("Please enter a valid email.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YUM | Forgot Password</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <form onSubmit={onSubmit}>
        <div id="forgot-password">
          <h1>Forgot Password</h1>
        </div>
        <div id="message">
          <p id="message">{errorMessage}</p>
        </div>
        <div id="email">
          <h3>Email</h3>
          <input type="text" name="email" />
        </div>
        <div>
         <br></br>
         <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
  


