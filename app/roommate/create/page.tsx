import Link from "next/link";

export default function CreateRoommate() {
  return (
    <div className="mx-auto text-center h-screen pt-4  bg-emerald-50">
      <div className="text-left px-8 bg-white py-8 mx-auto max-w-[500px] w-full rounded-lg mt-16 ">
        <div className="space-y-2 mb-10 ">
          <h1 className="text-4xl font-bold text-emerald-900">
            Create your profile
          </h1>
          <p className="text-2xl mt-1 font-medium text-emerald-700">
            Some info about yourself
          </p>
        </div>
        <form>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2 flex flex-col gap-1">
                <label htmlFor="name">Occupation</label>
                <input placeholder="John Doe" />

                <p className=" w-full py-2 px-2  text-red-700"></p>
              </div>
              <div className="space-y-2  flex flex-col gap-1">
                <label htmlFor="name">Nationality</label>
                <input placeholder="John Doe" />

                <p className=" w-full py-2 px-2  text-red-700"></p>
              </div>
              <div className="space-y-2  flex flex-col gap-1">
                <label htmlFor="name">Gender</label>
                <input placeholder="John Doe" />

                <p className=" w-full py-2 px-2  text-red-700"></p>
              </div>
            </div>
            <div className="w-full text-right">
              <button
                className="w-fit px-6 py-3 bg-emerald-800 text-white rounded-md"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
