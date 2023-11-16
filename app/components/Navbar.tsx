import Image from "next/image";
import styles from "../../styles/Navbar.module.css";

export default function Navbar({username}: {username: String}) {
  return (<>
    <div id={styles.navbar}>
      <div>ICON</div>
      <div>YUM</div>
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