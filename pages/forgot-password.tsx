import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)

    const username = formData.get("username").toString()

    if (username.length === 0) {
        setErrorMessage("Please enter a valid username.")
        return
    } else {
        setErrorMessage("")
    }

    // Confirmation code sent to user's email
    try {
      await Auth.forgotPassword(username);
      router.push('/reset-password');
    } catch(err) {
      setErrorMessage("Please enter a valid username.");
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
        <div id="username">
          <h3>Username</h3>
          <input type="text" name="username" />
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