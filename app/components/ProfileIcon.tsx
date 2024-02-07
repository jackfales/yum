import Image from 'next/image';

export default function ProfileIcon({ username }: { username: String }) {
  return (
    <>
      <a className="w-10 h-10 rounded-full" href={`/${username}`}>
        <Image
          className="w-10 h-10 rounded-full"
          src={`/images/pp/${username}.jpg`}
          alt="Picture of the user"
          width={40}
          height={40}
        />
      </a>
    </>
  );
}
