import styles from "../../styles/Dashboard.module.css"

export const metadata = {
  title: 'Dashboard'
}

export default function Dashboard() {
  // Replace with logic to grab username of current session
  // Maybe we should have it route to users/[username]?
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