import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

function ForgotPassword () {
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target)

    let email = formData.get("email")

    // TODO implement email format checking
    if (email.length === 0) {
        setMessage("Please enter a valid email.")
        return
    } else {
        setMessage("")
    }

    console.log(email)

    // Send a request to server to initiate the password reset process
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
          <p id="message">{message}</p>
        </div>
        <div id="email">
          <h3>Email</h3>
          <input type="email" name="email" />
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
  


