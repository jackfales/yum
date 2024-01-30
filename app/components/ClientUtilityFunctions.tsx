'use client';
import { useRouter } from 'next/navigation';
/**
 * Conditionally renders the button if the profile belongs to the current user
 * session else renders a follow button
 *
 * @param isUser - true if current session user matches page, false otherwise
 */
export function EditProfileAndFollowButton({
  user,
  isUser,
}: {
  user: string;
  isUser: boolean;
}) {
  const { push } = useRouter();
  // TODO(SWE-67): Need to handle the follow button click
  const handleClick = (e) => {
    e.preventDefault();
    push(`${user}/edit-profile`);
  };

  if (isUser) {
    return (
      <button
        onClick={handleClick}
        className="w-36 h-10 bg-emerald-500 transitions-colors hover:bg-emerald-600 rounded-full text-white text-md font-semibold text-center"
      >
        Edit profile
      </button>
    );
  } else {
    return (
      <button className="w-36 h-10 bg-emerald-500 transitions-colors hover:bg-emerald-600 rounded-full text-white text-md font-semibold text-center">
        Follow
      </button>
    );
  }
}
