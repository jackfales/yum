import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "../../styles/Dashboard.module.css";
import Modal from "../components/Modal";

export const metadata = {
  title: 'Dashboard'
}

export default async function Dashboard() {
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  // Passes client-side credentials to server via cookies
  const { Auth } = withSSRContext({ req });

  // Renders dashboard if logged in, else redirect to /login
  let username;
  try {
    const data = await Auth.currentAuthenticatedUser();
    ({ username } = data);
  } catch(err) {
    console.log(err);
    redirect('/login');
  }
  
  return (<>
    <div id={styles.header} className={`${styles.container} ${styles.spacebetween}`}>
      <div>YUM</div>
      <div>Dashboard</div>
      <a className={styles.profilepicture} href={`/${username}`}>
        <Image
          className={styles.profilepicture}
          src={`/images/pp/${username}.jpg`}
          alt="Picture of the user"
          width={40}
          height={40}
        />
      </a>
    </div>
    <Modal title="Create Post">
        <form id={styles.form}>
          <div className={styles.field}>
            <label htmlFor='dish'>Choose an image for your dish:</label>
            <input type='file' name='dish'/>
          </div>
          <div className={styles.field}>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name'/>
          </div>
          <div className={styles.field}>
            <label htmlFor='caption'>Caption:</label>
            <textarea name='caption' rows={3} className={styles.textbox}/>
          </div>
          <div className={styles.field}>
            <label htmlFor='recipe'>Recipe:</label>
            <textarea name='recipe' rows={12} className={styles.textbox}/>
          </div>
          <div className={styles.field}>
            <label htmlFor='tags'>Tags:</label>
            <input type='text' name='tags'/>
          </div>
        </form>
    </Modal>
  </>
  )
}