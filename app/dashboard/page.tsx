import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import PostFormModal from "../components/PostFormModal";
import Post from "../components/Post";
import styles from "../../styles/Dashboard.module.css";

export const metadata = {
  title: 'Dashboard'
}

const posts = [
  {title: 'Sample Post 1', description: "Description"},
  {title: 'Sample Post 2', description: "Description"},
  {title: 'Sample Post 3', description: "Description"},
  {title: 'Sample Post 4', description: "Description"},
  {title: 'Sample Post 5', description: "Description"}
]

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
  let username: String;
  try {
    const data = await Auth.currentAuthenticatedUser();
    ({ username } = data);
  } catch(err) {
    console.log(err);
    redirect('/login');
  }
  
  return (<>
    <Navbar username={username}></Navbar>
    <main id={styles.main} className={`${styles.container} ${styles.center}`}>
      <div id={styles.column}>
        {
          posts.map((posts, index) => (
            <Post key={index}></Post>
          ))
        }
      </div>
    </main>
    <PostFormModal></PostFormModal>
  </>
  )
}