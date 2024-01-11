'use client'
import { isEmpty, isJSON } from 'validator';
import { useEffect, useRef, useState, FormEvent } from 'react';

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
   * Validates post data inputted into form, then submits and closes the modal.
   * 
   * @param e - the form submit event
   */
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);

    /* TODO(SWE-68): Remove the line below. Upon form submission there should be a 
     * function to upload the post images to the cloud. This function should 
     * return the URI(s) pointing to the images which will then be stored in 
     * the database.
     */
    formData.set('url', 'https://example.com/');

    // Validates user inputted post data and generates error messages
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
    
    // Submits user inputted post data if there are no errors
    const hasNoErrors = Object.values(errors).every((input) => input === '');
    if (hasNoErrors) {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: formData
      });
      const body = await res.json();
      if (res.status == 201) {
        clickClose();
      } else {
        setErrorMessages({...errors, serverResponse: body.error});
      }
    }
  }
  
  return (
    <>
      <dialog ref={modalRef} className='rounded-xl shadow-md w-96'>
        <div>
          <div className='flex items-center justify-between h-8 border-b border-b-gray-200'>
            <h3 className='my-1.5 mx-2.5'>Create Post</h3>
            <button className='bg-white h-full aspect-square hover:bg-gray-100' onClick={clickClose}>x</button>
          </div>
          <form id='form' className='p-4' onSubmit={onSubmitHandler}>
            <p className='whitespace-normal text-red-400'>{errorMessages?.serverResponse}</p>
            <p className='whitespace-normal text-red-400'>{errorMessages?.url}</p>
            <label className='block' htmlFor='url'>Choose an image for your dish:</label>
            <input type='file' name='url'/>
            <p className='whitespace-normal text-red-400'>{errorMessages?.name}</p>
            <label className='block' htmlFor='name'>Name:</label>
            <input className='block w-full border rounded-md px-1 focus:outline-none' type='text' name='name'/>
            <p className='whitespace-normal text-red-400'>{errorMessages?.caption}</p>
            <label htmlFor='caption'>Caption:</label>
            <textarea className='block w-full border rounded-md px-1 focus:outline-none resize-none' name='caption' rows={3}/>
            <p className='whitespace-normal text-red-400'>{errorMessages?.recipe}</p>
            <label className='block' htmlFor='recipe'>Recipe:</label>
            <textarea className='block w-full border rounded-md px-1 focus:outline-none resize-none' name='recipe' rows={12}/>
            <p className='whitespace-normal text-red-400'>{errorMessages?.ingredients}</p>  
            <label htmlFor='ingredients'>Ingredients: Enter as JSON format for now</label>
            <input className='block w-full border rounded-md px-1 focus:outline-none' type='text' name='ingredients'/>
            <p className='whitespace-normal text-red-400'>{errorMessages?.tags}</p>
            <label htmlFor='tags'>Tags: Enter as JSON format for now</label>
            <input className='block w-full border rounded-md px-1 focus:outline-none' type='text' name='tags'/>
          </form>
          <div className='flex items-center justify-between h-8 border-t border-t-gray-200'>
            <button className='bg-white border-0 h-full w-full hover:bg-gray-100' form="form" type="submit">Submit</button>
          </div>
        </div>
      </dialog>
      <button onClick={clickOpen} className='w-36 h-10 bg-emerald-500 transitions-colors hover:bg-emerald-600 rounded-full text-white text-md font-semibold text-center'>Create Post</button>
    </>
  )
}