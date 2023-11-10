'use client'
import { isEmpty, isJSON } from 'validator';
import { useEffect, useRef, useState, FormEvent } from 'react';
import styles from "../../styles/Modal.module.css";

type ErrorMessages = {
  serverResponse?: string,
  url?: string,
  name?: string,
  caption?: string,
  recipe?: string,
  ingredients?: string,
  tags?: string
}

export default function PostFormModal() {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>();
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
    const formData: FormData = new FormData(e.currentTarget);

    // TODO: Replace test URL once we have image storage set up
    formData.set('url', 'https://example.com/');

    const errors: ErrorMessages = {};
    formData.forEach((input, field) => {
      switch (field) {
        case 'url':
        case 'name':
        case 'caption':
        case 'recipe':
          errors[field] = isEmpty(input) ? `Missing input for ${field}` : '';
          break;
        case 'ingredients':
        case 'tags':
          errors[field] = !isJSON(input) ? 
          `Please format the ${field} as a JSON object` : '';
          break;
        default:
          errors[field] = 'Default';
      }
      setErrorMessages(errors);
    })

    const hasNoErrors = Object.values(errors)
                                .every((input) => input === '');
    if (hasNoErrors) {
      const res = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        body: formData
      });
      console.log(res);
      
      clickClose();
    }
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
            <div className={styles.error}>{errorMessages?.serverResponse}</div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.url}</div>
              <label htmlFor='url'>Choose an image for your dish:</label>
              <input type='file' name='url'/>
            </div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.name}</div>
              <label htmlFor='name'>Name:</label>
              <input type='text' name='name'/>
            </div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.caption}</div>
              <label htmlFor='caption'>Caption:</label>
              <textarea name='caption' rows={3} className={styles.textbox}/>
            </div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.recipe}</div>
              <label htmlFor='recipe'>Recipe:</label>
              <textarea name='recipe' rows={12} className={styles.textbox}/>
            </div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.ingredients}</div>  
              <label htmlFor='ingredients'>Ingredients: Enter as JSON format for now</label>
              <input type='text' name='ingredients'/>
            </div>
            <div className={styles.field}>
              <div className={styles.error}>{errorMessages?.tags}</div>
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