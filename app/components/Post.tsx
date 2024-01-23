import ProfileIcon from "./ProfileIcon";
import { Varela_Round } from "next/font/google";

const varela_round = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Post({
  imageUrl,
  title,
  createdBy,
}: {
  imageUrl: string;
  title: String;
  createdBy: String;
}) {
  return (
    <>
      <div
        className={`${varela_round.className} flex flex-col border border-solid border-gray-200 rounded-lg bg-white my-5 transition ease-in-out duration-500 hover:shadow-xl`}
      >
        <div className="flex justify-between items-center h-14 px-5">
          <div className="flex-auto text-2xl">{title}</div>
        </div>
        <div className="shrink basis-[680px] w-full min-h-[400px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="Example"
          />
        </div>
        <div className="flex justify-between items-center h-14 px-5">
          <div className="flex gap-2.5 items-center text-lg">
            <ProfileIcon username={createdBy} />
            <span>{createdBy}</span>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400">
              L
            </div>
            <div className="flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400">
              C
            </div>
            <div className="flex justify-center items-center border border-solid border-gray-200 w-10 h-10 rounded-full text-gray-200 transition ease-in-out duration-500 hover:border-gray-400 hover:text-gray-400">
              S
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
