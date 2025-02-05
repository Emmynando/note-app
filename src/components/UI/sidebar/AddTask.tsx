import { FiPlus } from "react-icons/fi";
import NavItems from "./NavItemsComp";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { useGetTasksQuery } from "@/store/taskApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTask } from "@/store/AddListProvider";

import { filterTaskCount, filterTodayTaskCount } from "@/utils/helpers";

export default function AddTask() {
  const { openAddListModal } = useTask();
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    data: tasksResponse,
    isLoading,
    error,
  } = useGetTasksQuery(userId as string, {
    // Don't fetch if userId is missing
    skip: !userId,
  });

  if (error) {
    console.log("Error Fetching Task:", error);
  }

  const tasks = tasksResponse?.data || [];
  const appointmentCount = filterTaskCount(tasks, "Appointment");
  const todaysTaskCount = filterTodayTaskCount(tasks);

  const navCalander = [
    {
      id: "1",
      icon: MdOutlineWbSunny,
      text: "My Day",
      count: isLoading ? 0 : todaysTaskCount,
      href: "/",
    },
    {
      id: "2",
      icon: LuCalendarDays,
      text: "Calender",
      count: isLoading ? 0 : appointmentCount,
      href: "/calendar",
    },
  ];

  function handleModal() {
    if (!userId) {
      toast.warn("You are not Logged in");
      return;
    }
    openAddListModal();
  }

  return (
    <main className="container border-b border-gray-500">
      <button
        className="flex items-center gap-4 text-priText text-xl my-4"
        onClick={handleModal}>
        <FiPlus /> Add Task
      </button>
      <div className="relative w-full max-w-md mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-10 py-2 rounded-md bg-secClr
          focus:outline-none shadow-custom"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FiSearch />
        </button>
      </div>

      {navCalander.map((item) => (
        <NavItems
          key={item.id}
          text={item.text}
          count={item.count}
          icon={<item.icon />}
          href={item.href}
        />
      ))}
    </main>
  );
}
