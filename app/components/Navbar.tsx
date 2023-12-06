'use client'
import { useState, useEffect } from 'react'
import ProfileIcon from "./ProfileIcon";
import { Playfair } from "next/font/google"

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['700']
})

export default function Navbar({username}: {username: String}) {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<Boolean>(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    setVisible(currentScrollPos < prevScrollPos );
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (<>
    <div className={`flex justify-between items-center fixed top-0 left-0 w-full h-12 px-5 shadow bg-rose-200 text-emerald-600 transition-transform ease duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div>ICON</div>
      <h1 className={`${playfair.className} text-4xl`}>Yum</h1>
      <ProfileIcon username={username}/>
    </div>
  </>
  )
}