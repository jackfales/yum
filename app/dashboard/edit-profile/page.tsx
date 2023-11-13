import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "../../../styles/Dashboard.module.css";

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

  // Renders dashboard if logged in, else redirect to /login
  let username;
  try {
    const data = await Auth.currentAuthenticatedUser();
    ({ username } = data);
  } catch(err) {
    console.log(err);
    redirect('/login');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)

  }

  /* NEEDS
    - First Name
    - Last Name
    - Username
    - Gender
    - Bio
    - Profile Pic
  */
  
  return (
    <div>
        <div id={styles.header} className={`${styles.container} ${styles.spacebetween}`}>
        <div>EDIT PROFILE</div>
    </div>
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Profile Picture</h3>
                <input type='image' name='profilePicture'/>   
            </div>
            <div>
                <h3>First Name</h3>
                <input type='text' name='firstName'/>   
            </div>
            <div>
                <h3>Last Name</h3>
                <input type='text' name='lastName'/>   
            </div>
            <div>
                <h3>Username</h3>
                <input type='text' name='username'/>   
            </div>
            <div>
                <h3>Gender</h3>
                <input type='text' name='gender'/>   
            </div>
            <div>
                <h3>Bio</h3>
                <input type='text' name='bio'/>   
            </div>
            <button type='submit'>Save Changes</button>
        </form>
    </div>
  )
}