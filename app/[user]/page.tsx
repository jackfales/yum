export const metadata = {
  title: 'Dashboard'
}

// Grab all users, this would probably query the user database
export async function generateStaticParams() {
  return [{ user: 'dtran'}, { user: 'jfales'}, { user: 'sfales'}];
}

export default async function Profile({ params }: { params: {user: string}}) {
  const { user } = params;
  return <h1>Hi this is {user}.</h1>
}