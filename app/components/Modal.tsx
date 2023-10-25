'use client'
import { useEffect, useRef, useState } from 'react';

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
      <dialog ref={modalRef}>
        <div>
          <div>
            <h1>{title}</h1>
            <button onClick={clickClose}>x</button>
          </div>
          <div>
            {children}
            <div>
              <button onClick={clickOk}>OK</button>
            </div>
          </div>
        </div>
      </dialog>
      <button onClick={clickOpen}>Create Post</button>
    </>
  )
}