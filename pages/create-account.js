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
            'Password must be at least 6 characters longer!' : '';
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
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='fname'>First name:</label>
            <input type='text' name='fname' onChange={handleChange}/>
            <div style={{color: 'red', height: '25px'}}>{errors.fname}</div>
          </div>
          <div>
            <label htmlFor='lname'>Last name:</label>
            <input type='text' name='lname' onChange={handleChange}/>
            <div style={{color: 'red', height: '25px'}}>{errors.lname}</div>
          </div>
          <div>
            <label htmlFor='uname'>Username:</label>
            <input type='text' name='uname' onChange={handleChange}/>
            <div style={{color: 'red', height: '25px'}}>{errors.uname}</div>
          </div>
          <div>
            <label htmlFor='pword'>Password:</label>
            <input type='password' name='pword' onChange={handleChange}/>
            <div style={{color: 'red', height: '25px'}}>{errors.pword}</div>
          </div>
          <div>
            <label htmlFor='confirmpword'>Confirm Password:</label>
            <input type='password' name='confirmpword' onChange={handleChange}/>
            <div style={{color: 'red', height: '25px'}}>{errors.confirmpword}</div>
          </div>
          <button type='submit'>Create Account</button>
        </form>
      </main>
      <style jsx>{`
      label {
        display: block;
      }
      `}</style>
    </div>
  )
}