import ProfileIcon from "./ProfileIcon";
import { Playfair } from "next/font/google"

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['700']
})

export default function Navbar({username}: {username: String}) {
  return (<>
    <div className='flex justify-between items-center fixed top-0 left-0 w-full h-12 px-5 bg-rose-200 text-emerald-600'>
      <div>ICON</div>
      <h1 className={`${playfair.className} text-4xl`}>Yum</h1>
      <ProfileIcon username={username}/>
    </div>
  </>
  )
}