import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Login() {

  function onSubmit(event) {
    event.preventDefault()

    // Get form data and create JSON object
    const formData = new FormData(event.target)
    const formDataObj = {}
    formData.forEach((value, key) => (formDataObj[key] = value))

    let username = formDataObj["username"]
    let password = formDataObj["password"]

    // Check if user input username and password
    if (username.length == 0 || password.length == 0) {
      
    }

    console.log(username)
    console.log(password)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>YUM | Login</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <form onSubmit={onSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <h3>Username</h3>
          <input type="text" name="username" />
        </div>
        <div>
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
