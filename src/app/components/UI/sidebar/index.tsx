import AddTask from "../../Layout/AddTask";
import Profile from "./Profile";

export default function Sidebar() {
  return (
    <main className="absolute inset-0 z-40 bg-[#2f3136] w-[25%] h-dvh">
      <Profile />
      <AddTask />
    </main>
  );
}
