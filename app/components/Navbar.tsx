import Image from "next/image";
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
      <a className={styles.profilepicture} href={`/${username}`}>
        <Image className={styles.profilepicture}
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