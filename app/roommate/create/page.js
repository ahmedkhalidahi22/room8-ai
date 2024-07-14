import Link from "next/link";

export default function CreateRoommate() {
  return (
    <div className="mx-auto text-center h-screen pt-4  bg-emerald-50">
      <div className="space-y-2 mb-10 ">
        <h1 className="text-4xl font-bold text-emerald-900">Room8 AI</h1>
        <p className="text-2xl  font-medium text-emerald-700">
          Find your next roommate using AI
        </p>
      </div>
      <Link
        className="w-fit py-3 px-4 bg-emerald-800 rounded-md text-white"
        href={"/signup"}
      >
        SIGNUP NOW
      </Link>
    </div>
  );
}
