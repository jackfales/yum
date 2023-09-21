import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Login() {

  async function onSubmit(event) {
    event.preventDefault()

    // Get form data and create JSON object
    const formData = new FormData(event.target)
    const formDataObj = {}
    formData.forEach((value, key) => (formDataObj[key] = value))

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formDataObj),
    })
 
    // Handle response if necessary
    const data = await response.json()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>YUM | Login</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <form onSubmit={onSubmit}>
        <input type="text" name="username" />
        <input type="text" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
