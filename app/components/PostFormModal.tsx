'use client'
import { API } from 'aws-amplify';
import { useEffect, useRef, useState, FormEvent } from 'react';
import styles from "../../styles/Modal.module.css";

export default function PostFormModal() {
  const [showModal, setShowModal] = useState<Boolean>(false)
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  /**
   *  Opens the modal
   */
  const clickOpen = (): void => {
    setShowModal(true);
  }

  /**
   * Closes the modal
   */
  const clickClose = (): void => {
    setShowModal(false);
  }

  /**
   * Submits new post data then closes the modal
   * 
   * @param e - the form submit event
  */
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Object = Object.fromEntries((new FormData(e.currentTarget)));
    console.log(JSON.stringify(formData));

    const res = await fetch('https://wb07xao9oa.execute-api.us-west-2.amazonaws.com/dev/post', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });
    console.log(await res.json());
    
    clickClose();
  }
  
  return (
    <>
      <dialog ref={modalRef} id={styles.modal}>
        <div>
          <div className={`${styles.container} ${styles.spacebetween}`}
               id={styles.header}>
            <h3 id={styles.title}>Create Post</h3>
            <button id={styles.closebutton} onClick={clickClose}>x</button>
          </div>
          <form id='form' className={styles.form} onSubmit={onSubmitHandler}>
            <div className={styles.field}>
              <label htmlFor='url'>Choose an image for your dish:</label>
              <input type='file' name='url'/>
            </div>
            <div className={styles.field}>
              <label htmlFor='name'>Name:</label>
              <input type='text' name='name'/>
            </div>
            <div className={styles.field}>
              <label htmlFor='caption'>Caption:</label>
              <textarea name='caption' rows={3} className={styles.textbox}/>
            </div>
            <div className={styles.field}>
              <label htmlFor='recipe'>Recipe:</label>
              <textarea name='recipe' rows={12} className={styles.textbox}/>
            </div>
            <div className={styles.field}>
              <label htmlFor='ingredients'>Ingredients: Enter as JSON format for now</label>
              <input type='text' name='ingredients'/>
            </div>
            <div className={styles.field}>
              <label htmlFor='tags'>Tags: Enter as JSON format for now</label>
              <input type='text' name='tags'/>
            </div>
          </form>
            <div id={styles.footer} className={`${styles.container} ${styles.center}`}>
              <button id={styles.submitbutton} form="form" type="submit">Submit</button>
            </div>
        </div>
      </dialog>
      <div className={`${styles.container} ${styles.center}`}>
        <button id={styles.modalbutton} onClick={clickOpen}>Create Post</button>
      </div>
    </>
  )
}