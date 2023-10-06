import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  function onSubmit(event) {
    event.preventDefault()

    // Get form data
    const formData = new FormData(event.target)

    let username = formData.get("username")
    let password = formData.get("password")

    // Check if user input username and password
    if (username.length === 0 || password.length === 0) {
      setErrorMessage("Please enter both a Username and Password.")
      return
    } else {
      setErrorMessage("")
    }

    console.log("Username: %s", username)
    console.log("Password: %s", password)
  }


    await fetch('./api/login', {
      method: 'POST',
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(userInputs),
    })   
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push('/index');
        } else {
          setErrorMessages({ serverResponse: res.message });
        }
    });
  

  return (
    <div className={styles.container}>
      <Head>
        <title>YUM | Login</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <form onSubmit={onSubmit}>
        <div id="login-header">
          <h1>Login</h1>
        </div>
        <div id="error">
          <p id="error-message">{errorMessage}</p>
        </div>
        <div id="username">
          <h3>Username</h3>
          <input type="text" name="username" />
        </div>
        <div id="password">
          <h3>Password</h3>
          <input type="text" name="password" />
        </div>
        <div>
         <br></br>
         <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default withAuthenticator(Login);
