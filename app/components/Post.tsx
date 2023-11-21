import styles from "../../styles/Post.module.css";
import Image from "next/image";
import { Varela_Round } from "next/font/google";

const varela_round = Varela_Round({
  subsets: ['latin'],
  weight: ['400']
})

export default function Post({name}: {name: String}) {
  return (<>
    <div id={styles.post} className={varela_round.className}>
      <div id={styles.header}>
        <div id={styles.title}>{name}</div>
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
          <span id={styles.username}>dtran</span>
        </a>
        <div id={styles.buttons}>
          <div id={styles.like}>L</div>
          <div id={styles.comment}>C</div>
          <div id={styles.share}>S</div>
        </div>
      </div>
    </div>
  </>
  )
}