import Head from 'next/head';
import Link from 'next/link';
import { Playfair, Roboto } from "next/font/google";

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['700']
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400']
})

export default function Home() {
  return (
    <>
      <Head>
        <title>YUM</title>
        <link rel="icon" href="/favicon-32x32.png"/>
      </Head>

      <main className='bg-cream-100 h-screen flex justify-center items-center'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-16'>
          <div className='w-[375px] lg:w-[580px]'>
            <h1 className={`${playfair.className} text-7xl tracking-tight text-rose-200 text-center lg:text-left`}>Yum.</h1>
            <h2 className={`${roboto.className} text-3xl text-neutral-800 text-center lg:text-left`}>Discover and share recipes with chefs and home-cooks alike.</h2>
          </div>
          <div className='flex flex-col border border-gray-100 bg-white shadow-md rounded-lg w-80 p-5'>
            <h2 className='text-2xl text-neutral-800 tracking-tight text-center'>New to Yum?</h2>
            <Link href='/create-account' className='my-5 py-2 border border-emerald-500 transition-colors hover:border-emerald-600 rounded-full text-emerald-500 hover:text-emerald-600 text-xl font-semibold text-center'>Create Account</Link>
            <div class="relative flex items-center">
              <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">OR</span>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <Link href='/login' className='my-5 py-2 border bg-emerald-500 transition-colors hover:bg-emerald-600 rounded-full text-white text-xl font-semibold text-center'>Log in</Link>
            <Link href='/forgot-password' className='text-center text-blue-400'>Forgot password?</Link>
          </div>
        </div>
      </main>
    </>
  );
}
