'use client'
import { useEffect, useRef, useState } from 'react';
import styles from "../../styles/Modal.module.css";

type Props = {
  children: React.ReactNode,
  title: String,
}

export default function Modal({ title, children }: Props) {
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
  function clickOpen(): void {
    setShowModal(true);
  }

  /**
   * Closes the modal
   */
  function clickClose(): void {
    setShowModal(false);
  }

  function clickOk(): void {
    clickClose();
  }
  
  return (
    <>
      <dialog ref={modalRef} id={styles.modal}>
        <div>
          <div className={`${styles.container} ${styles.spacebetween}`}
               id={styles.header}>
            <h3 id={styles.title}>{title}</h3>
            <button id={styles.closebutton} onClick={clickClose}>x</button>
          </div>
            {children}
            <div id={styles.footer} className={`${styles.container} ${styles.center}`}>
              <button id={styles.submitbutton} onClick={clickOk}>Submit</button>
            </div>
        </div>
      </dialog>
      <div className={`${styles.container} ${styles.center}`}>
        <button id={styles.modalbutton}onClick={clickOpen}>Create Post</button>
      </div>
    </>
  )
}