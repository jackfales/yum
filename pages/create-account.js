import Head from 'next/head';

export default function Account() {
  return (
    <div>
      <Head>
          <title>Create Account</title>
      </Head>
      <main>
        <div>
          <form method='POST' action=''>
            <div>
              <label htmlFor='username'>Username:</label>
              <input type='text' id='username' name='username'></input>
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input type='text' id='password' name='password'></input>
            </div>
            <div>
              <label htmlFor='confirmpassword'>Confirm Password:</label>
              <input type='text' id='confirmpassword' name='confirmpassword'></input>
            </div>
            <button type='submit'>Create Account</button>
          </form>
        </div>
      </main>
    </div>
  )
}