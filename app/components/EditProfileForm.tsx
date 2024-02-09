'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Amplify, Storage, Auth } from 'aws-amplify';
import awsExports from '../../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default function EditProfileForm({ userData }) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();

  const userID = userData['body']['id'][0];
  const firstName = userData['body']['firstName'][0];
  const lastName = userData['body']['lastName'][0];
  const username = userData['body']['username'][0];
  const gender = userData['body']['gender'][0];
  const bio = userData['body']['bio'][0];

  const currentUserInfo = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    gender: gender,
    bio: bio,
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);

    // Uploads the profile picture to S3 buckets if the user submitted a file
    const file: any = formData.get('file');
    console.log(file);
    const filePath = `${userID}/pfp`;
    if (file) {
      try {
        await Auth.currentAuthenticatedUser();
        await Storage.put(filePath, file, {
          contentType: file.type,
        });
        console.log(`Successfully uploaded profile picture: ${filePath}`);
      } catch (err) {
        console.log(`Error uploading profile picture: ${filePath}`);
      }
    }
    formData.delete('file');

    // Create an object to store new user information if it has changed from the
    // current user information
    let attributes = {};
    const formInputs: Object = Object.fromEntries(formData);
    for (const [key, value] of Object.entries(formInputs)) {
      if (currentUserInfo[key] === value) {
        continue;
      } else {
        attributes[key] = value;
      }
    }

    const payload = {
      method: 'PUT',
      attributes: attributes,
    };

    const res = await fetch(`http://localhost:3000/api/users/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
    const status = res.status;

    if (status == 200) {
      router.push('/dashboard');
    } else {
      setErrorMessage(data['body']);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-full">
        <p>{errorMessage}</p>
        <label htmlFor="file" className="font-semibold">
          Profile Picture:
        </label>
        <input
          type="file"
          name="file"
          accept="image/*"
          className="w-full mb-2"
        />
        <label htmlFor="firstName" className="font-semibold">
          First Name:
        </label>
        <input
          type="text"
          defaultValue={firstName}
          name="firstName"
          className="w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md"
        />
        <label htmlFor="lastName" className="font-semibold">
          Last Name:
        </label>
        <input
          type="text"
          defaultValue={lastName}
          name="lastName"
          className="w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md"
        />
        <label htmlFor="username" className="font-semibold">
          Username:
        </label>
        <input
          type="text"
          defaultValue={username}
          name="username"
          className="w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md"
        />
        <label htmlFor="gender" className="font-semibold">
          Gender:
        </label>
        <input
          type="text"
          defaultValue={gender}
          name="gender"
          className="w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md"
        />
        <label htmlFor="bio" className="font-semibold">
          Bio:
        </label>
        <input
          type="text"
          defaultValue={bio}
          name="bio"
          className="w-full border border-gray-200 shadow-inner mb-2 py-1 px-2 rounded-md"
        />
        <button
          type="submit"
          className="my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
