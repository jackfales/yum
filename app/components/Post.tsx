import styles from "../../styles/Post.module.css";
import Image from "next/image";
import { Varela_Round } from "next/font/google";

const varela_round = Varela_Round({
  subsets: ['latin'],
  weight: ['400']
})

export default function Post() {
  return (<>
    <div id={styles.post} className={varela_round.className}>
      <div id={styles.header}>
        <div id={styles.title}>Carrot Cake</div>
        <div id={styles.date}>11-16-2023</div>
      </div>
      <div id={styles.content}>
        <img
          src="https://picsum.photos/680"
          alt="Example"
        />
      </div>
      <div id={styles.footer}>
        <a id={styles.user} href={`/dtran`}>
          <Image
            id={styles.profilepicture}
            src={`/images/pp/dtran.jpg`}
            alt="Picture of the user"
            width={40}
            height={40}
          />
        </a>

      </div>
    </div>
  </>
  )
}