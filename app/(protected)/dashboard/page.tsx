import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="top-5">session details:</p>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut({ redirect: false });
          redirect("/login");
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Dashboard;
