 import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import styles from "../../../styles/Dashboard.module.css";
import EditProfileForm from "../../components/EditProfileForm";

export const metadata = {
  title: 'EditProfile'
}

export default async function EditProfile() {
  // Packages cookies into request header
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  // Passes client-side credentials to server via cookies
  const { Auth } = withSSRContext({ req });

  // Renders edit profile page if authenticated, else redirect to login
  let username;
  try {
    const data = await Auth.currentAuthenticatedUser();
    ({ username } = data);
  } catch(err) {
    console.log(err);
    redirect('/login');
  }

  return (<>
    <div>
        <div id={styles.header} className={`${styles.container} ${styles.spacebetween}`}>
        <div>EDIT PROFILE</div>
        </div>
    </div>
    <EditProfileForm></EditProfileForm>
  </>
  )
}