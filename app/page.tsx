import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto text-center h-screen pt-4  bg-emerald-50">
      <div className="space-y-2 mb-10 ">
        <h1 className="text-4xl font-bold text-emerald-900">Room8 AI</h1>
        <p className="text-2xl  font-medium text-emerald-700">
          Find your next roommate using AI
        </p>
      </div>
      <div className=" mt-40 w-fit mx-auto ">
        <h2 className="text-xl text-emerald-700">What do you need?</h2>
        <div className="flex mt-5 flex-row gap-4 justify-center content-center">
          <Link
            className="w-fit py-3 px-4 bg-emerald-800 rounded-md text-white hover:bg-emerald-700 duration-200 transition-all"
            href={"/roommate/create"}
          >
            Searching for a place
          </Link>
          <Link
            className="w-fit py-3 px-10 bg-emerald-800 rounded-md text-white hover:bg-emerald-700 duration-200 transition-all"
            href={"/rooms/create"}
          >
            Need a rommate
          </Link>
        </div>
      </div>
    </div>
  );
}
