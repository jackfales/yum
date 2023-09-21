import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Account() {
  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    uname: '',
    pword: '',
    confirmpword: '',
  });

  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    uname: '',
    pword: '',
    confirmpword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation criteria for each field
    for (const input in inputs) {
      let errorMessage;
      switch (input) {
        case 'fname':
          errorMessage = inputs[input].length == 0 ?
            'Please provide a first name!' : '';
            break;
        case 'lname':
          errorMessage = inputs[input].length == 0 ?
            'Please provide a last name!' : '';
            break;
        case 'uname':
          errorMessage = inputs[input].length < 5 ? 
            'Username must be at least 5 characters long!' : '';
            break;
        case 'pword':
          errorMessage = inputs[input].length < 5 ?
            'Password must be at least 6 characters long!' : '';
          break;
        case 'confirmpword':
          errorMessage = inputs['pword'] !== inputs[input] ?
            'Passwords do not match!' : '';
          errorMessage = inputs[input].length == 0 ?
            'Please confirm your password!' : '';
      }
      setErrors((prevError) => ({...prevError, [input]: errorMessage}));
    }
    console.log(inputs);
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputs({...inputs, [e.target.name]: value});
  }
  
  return (
    <div>
      <Head>
          <title>Create Account</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='fname'>First name:</label>
            <input type='text' name='fname' onChange={handleChange}/>
            <div className='error'>{errors.fname}</div>
          </div>
          <div>
            <label htmlFor='lname'>Last name:</label>
            <input type='text' name='lname' onChange={handleChange}/>
            <div className='error'>{errors.lname}</div>
          </div>
          <div>
            <label htmlFor='uname'>Username:</label>
            <input type='text' name='uname' onChange={handleChange}/>
            <div className='error'>{errors.uname}</div>
          </div>
          <div>
            <label htmlFor='pword'>Password:</label>
            <input type='password' name='pword' onChange={handleChange}/>
            <div className='error'>{errors.pword}</div>
          </div>
          <div>
            <label htmlFor='confirmpword'>Confirm Password:</label>
            <input type='password' name='confirmpword' onChange={handleChange}/>
            <div className='error'>{errors.confirmpword}</div>
          </div>
          <button type='submit'>Create Account</button>
        </form>
      </main>
      <style jsx>{`
        main {
        }

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