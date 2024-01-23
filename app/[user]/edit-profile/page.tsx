import { withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import EditProfileForm from "../../components/EditProfileForm";

export const metadata = {
  title: "Edit Profile",
};

export default async function EditProfile() {
  // Checks if the request comes from an authenticated user
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  const { Auth } = withSSRContext({ req });

  // Renders edit profile page if authenticated, else redirect to login
  let userID;
  let username;
  try {
    const data = await Auth.currentAuthenticatedUser();
    userID = data.attributes.sub;
    username = data.username;
  } catch (err) {
    console.log(err);
    redirect("/login");
  }
  const res = await fetch(`http://localhost:3000/api/users/${userID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return (
    <>
      <Navbar username={username} />
      <main className="bg-cream-100 h-screen flex justify-center items-center pt-12">
        <div className="flex flex-col justify-center items-start w-80">
          <h1 className="text-5xl tracking-tight font-bold mb-4 text-neutral-800">
            Edit Profile
          </h1>
          <EditProfileForm userData={data} />
        </div>
      </main>
    </>
  );
}
