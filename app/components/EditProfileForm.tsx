'use client'
import { FormEvent } from 'react';

export default function EditProfileForm() {

  /**
   * Submits new post data then closes the modal
   * 
   * @param e - the form submit event
  */
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData: Object = Object.fromEntries((new FormData(e.currentTarget)));
    console.log(JSON.stringify(formData));
  }
  
  return (
    <>
        <form onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor='profilePicture'>Profile Picture</label>
              <input type='file' name='profilePicture'/>
            </div>
            <div>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' name='firstName'/>   
            </div>
            <div>
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' name='lastName'/>   
            </div>
            <div>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username'/>   
            </div>
            <div>
                <label htmlFor='gender'>Gender</label>
                <input type='text' name='gender'/>   
            </div>
            <div>
                <label htmlFor='bio'>Bio</label>
                <input type='text' name='bio'/>   
            </div>
            <button type='submit'>Save Changes</button>
        </form>
    </>
  )
}