import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username").toString();

    // TODO(SWE-59): Change input.length to validator.isEmpty() for consistency
    // Validates user inputted data and generates error messages
    if (username.length === 0) {
      setErrorMessage("Please enter a valid username.");
      return;
    } else {
      setErrorMessage("");
    }

    // Sends an reset password to the email associated with the username
    /* TODO(SWE-59): Separate backend from frontend. The following code should be
     * refactored to an Route Handler.
     * Similar to what is done in `./app/components/CreatePostModal.tsx`
     */
    try {
      await Auth.forgotPassword(username);
      router.push("/reset-password");
    } catch (err) {
      setErrorMessage("Please enter a valid username.");
    }
  };

  return (
    <>
      <Head>
        <title>YUM | Forgot Password</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <main className="bg-cream-100 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-start w-80">
          <h1 className="text-5xl tracking-tight font-bold mb-4">
            Forgot Password
          </h1>
          <h2 className="mb-6">
            Enter the <span className="font-semibold">username</span> associated
            with your account and we&apos;ll send an email to reset your
            password.
          </h2>
          <form onSubmit={onSubmit} className="w-full">
            <label htmlFor="username" className="font-semibold">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-200 shadow-inner py-1 px-2 rounded-md"
            />
            <div className="mb-2 text-red-400">{errorMessage}</div>
            <button
              type="submit"
              className="my-2 py-2 w-full border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-lg font-semibold text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default ForgotPassword;
