import styles from "../../styles/Dashboard.module.css"

export const metadata = {
  title: 'Dashboard'
}

export default function Dashboard() {
  // TODO Have profile picture route to the profile of the current session user
  const username = 'dtran';
  
  return (<>
    <div className={`${styles.header} ${styles.container}`}>
      <div>YUM</div>
      <div>Dashboard</div>
      <a className={styles.profilepicture} href={`/${username}`}></a>
    </div>
  </>
  )
}