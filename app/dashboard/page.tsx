import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import Image from 'next/image';
import { redirect } from "next/navigation";
import styles from "../../styles/Dashboard.module.css"

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
    <div className={`${styles.header} ${styles.container}`}>
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
  </>
  )
}