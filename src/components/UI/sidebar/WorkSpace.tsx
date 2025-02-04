import { GrNotes } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import NavItems from "../sidebar/NavItemsComp";
import { filterTaskCount } from "@/utils/helpers";
import { useGetTasksQuery } from "@/store/taskApi";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function WorkSpace() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    data: tasksResponse,
    isLoading,
    error,
  } = useGetTasksQuery(userId as string, {
    // Don't fetch if userId is missing
    skip: !userId,
  });

  const tasks = tasksResponse?.data || [];

  const currentTasks = tasks?.filter((task) => {
    if (!task.scheduleStart) return false;

    const taskDate = new Date(task.scheduleStart);
    const today = new Date();

    // Normalize today's date to start of day (midnight) for accurate comparison
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    // Include tasks from today onwards
    return taskDate >= today;
  });
  const currentTaskCount = currentTasks?.length || 0;

  const taskCategory = filterTaskCount(tasks, "Tasks");
  const notesCategory = filterTaskCount(tasks, "Notes");
  const navWorkspace = [
    {
      id: "1",
      icon: CiBoxList,
      text: "All",
      count: currentTaskCount,
      href: "/all",
    },
    {
      id: "2",
      icon: FaTasks,
      text: "Tasks",
      count: isLoading ? 0 : taskCategory,
      href: "/",
    },
    {
      id: "3",
      icon: GrNotes,
      text: "Notes",
      count: isLoading ? 0 : notesCategory,
      href: "/",
    },
  ];
  return (
    <main className="container">
      <h2 className="text-xs text-white">Workspace</h2>
      <div className="pl-2">
        {navWorkspace.map((item) => (
          <NavItems
            key={item.id}
            text={item.text}
            count={item.count}
            icon={<item.icon />}
            href={item.href}
          />
        ))}
      </div>
    </main>
  );
}
