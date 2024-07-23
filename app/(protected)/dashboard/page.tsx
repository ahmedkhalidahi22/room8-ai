import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="top-5">session details:</p>
      {JSON.stringify(session)}
    </div>
  );
};

export default Dashboard;
