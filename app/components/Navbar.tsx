import ProfileIcon from "./ProfileIcon";
import styles from "../../styles/Navbar.module.css";
import { Playfair } from "next/font/google"

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['700']
})

export default function Navbar({username}: {username: String}) {
  return (<>
    <div id={styles.navbar}>
      <div>ICON</div>
      <h1 className={playfair.className}>Yum</h1>
      <ProfileIcon username={username}/>
    </div>
  </>
  )
}