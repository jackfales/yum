'use client'
import { useRouter } from 'next/navigation';
import styles from "../../styles/Profile.module.css"
/**
 * Conditionally renders the button if the profile belongs to the current user
 * session else renders a follow button
 * 
 * @param isUser - true if current session user matches page, false otherwise
 */
export function EditProfileAndFollowButton({ user, isUser }: { user: string, isUser: boolean }) {
    const { push } = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        push(`${user}/edit-profile`);
    }

    if (isUser) {
      return (<button onClick={handleClick} id={styles['profilebutton']}>Edit profile</button>);
    } else {
      return (<button id={styles['profilebutton']}>Follow</button>);
    }
}