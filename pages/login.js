import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function onSubmit(event) {
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

    // Send username and password to API for validation
    let userCredentials = {
      username,
      password
    }

    await fetch('./api/login', {
      method: 'POST',
      headers: {
        Accept: "application/json",
      },
    body: JSON.stringify(userCredentials),
    })   
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.success) {
          router.push('/');
        } else {
          setErrorMessage(res.message);
        }
    });
  }

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
          <input type="password" name="password" />
        </div>
        <div>
         <br></br>
         <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
