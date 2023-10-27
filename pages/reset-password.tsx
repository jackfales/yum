import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';

function ResetPassword () {
  const [errorMessage, setErrorMessage] = useState('Please enter your email, verification code sent to your email, and your new password');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target)

    const username = formData.get("username").toString()
    const verificationCode = formData.get("verificationCode").toString()
    const newPassword = formData.get("newPassword").toString()

    // Reset password
    try {
      await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
      router.push('/login');
    } catch(err) {
      setErrorMessage("Please make sure all entries are correct.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YUM | Reset Password</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <form onSubmit={onSubmit}>
        <div id="resetPassword">
          <h1>Reset Password</h1>
        </div>
        <div id="message">
          <p id="message">{errorMessage}</p>
        </div>
        <div id="username">
          <h3>Username</h3>
          <input type="text" name="username" />
        </div>
        <div id="verificationCode">
          <h3>Verification Code</h3>
          <input type="text" name="verificationCode" />
        </div>
        <div id="newPassword">
          <h3>New Password</h3>
          <input type="text" name="newPassword" />
        </div>
        <div>
         <br></br>
         <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
  


