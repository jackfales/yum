import Head from 'next/head';
import React, { useState } from 'react';

export default function Account() {
  return (
    <div>
      <Head>
          <title>Create Account</title>
      </Head>
      <main>
        <div>
          <Form></Form>
        </div>
      </main>
    </div>
  )

  function Input({name, type}) {
    let nameSpacesRemoved = name.replace(/\s/g, '').toLocaleLowerCase();
    return (
      <div>
        <label htmlFor={nameSpacesRemoved}>{name}:</label>
        <input type={type} id={nameSpacesRemoved} name={nameSpacesRemoved}></input>
      </div>
    )
  }

  function Form() {
    const [inputs, setInputs] = useState({
      uname: '',
      email: '',
    });

    const [errors, setErrors] = useState({
      uname: '',
      email: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      for (const input in inputs) {
        let errorMessage;
        switch (input) {
          case 'uname':
            errorMessage = inputs[input].length < 5 ? 
              'Username must be at least 5 characters long!' : '';
            break;
        }
        setErrors((prevError) => ({...prevError, [input]: errorMessage}));
      }
    }

    const handleChange = (e) => {
      const value = e.target.value
      setInputs({...inputs, [e.target.name]: value});
    }

    console.log(errors);

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='uname'>Username:</label>
            <input type='text' 
              id='uname'
              name='uname'
              onChange={handleChange}
            />
            {errors.uname.length > 0 &&
              <p style={{color: 'red'}}>{errors.uname}</p>}
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input type='text' 
              id='email'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='pword'>Password:</label>
            <input type='password' 
              id='pword'
              name='pword'
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='confirmpword'>Confirm Password:</label>
            <input type='password' 
              id='confirmpword'
              name='confirmpword'
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )

  }
}