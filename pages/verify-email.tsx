import Head from 'next/head';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function ConfirmSignUp() {
    const [errorMessage, setErrorMessage] = useState('Please input your username and confirmation code sent to your email.');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get("username").toString()
        const confirmationCode = formData.get("confirmationCode").toString()

        try {
            await Auth.confirmSignUp(username, confirmationCode);
            router.push("/login")
        } catch (error) {
            setErrorMessage(error.toString())
        }
    }

    return (
        <div>
          <Head>
              <title>YUM | Confirm Account</title>
          </Head>
          <main className={styles.container}>
            <form onSubmit={handleSubmit}>
              <div className='error'>{errorMessage}</div>
              <div>
                <h3>Username</h3>
                <input type='text' name='username'/>   
              </div>
              <div>
                <h3>Confirmation Code</h3>
                <input type='text' name='confirmationCode'/>
              </div>
              <button type='submit'>Confirm Account</button>
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