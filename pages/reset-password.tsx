import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';

function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState('Please enter your email, verification code sent to your email, and your new password');

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


    // Make sure password conforms to policy
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
          <input type="password" name="newPassword" />
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