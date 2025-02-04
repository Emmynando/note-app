"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/UserReducer";
import DayCard from "@/components/Layout/MyApp/DayCard";
import { useSelector } from "react-redux";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RootState } from "@/store/store";
import DayHeader from "@/components/UI/Header";
import wand from "../../public/svg/wand.svg";
import SvgViewer from "@/components/UI/SVGViewer";
import { useGetTasksQuery } from "@/store/taskApi";
import SingleDayCard from "@/components/Layout/MyApp/SingleDayCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function Home() {
  const today = new Date();
  const dispatch = useDispatch();
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const userId = useSelector((state: RootState) => state.user.userId);
  const [showPrevious, setShowPrevious] = useState(true);
  const [showToday, setShowToday] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showDeet, setShowDeet] = useState(false);

  // to get user details
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUserToken = localStorage.getItem("userToken");
    if (savedUserId && savedUserToken) {
      dispatch(setUserInfo({ userId: savedUserId, userToken: savedUserToken }));
    }
  }, [dispatch]);

  // to get all related task
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
  function toggleDeets() {
    setShowDeet((prevState) => !prevState);
  }

  // Filter tasks that are scheduled for today
  const todaysTasks =
    tasks &&
    tasks.filter((task) => {
      // Ensure task.scheduleStart is not undefined
      if (!task.scheduleStart) return false;
      const taskDate = new Date(task.scheduleStart);
      const today = new Date();
      // Compare only the date part (year, month, day) of both dates
      return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
      );
    });

  // Get the most recent past task
  const pastTasks = tasks
    // Remove tasks with undefined scheduleStart
    ?.filter((task) => task.scheduleStart)
    // Convert to Date safely
    .map((task) => ({ ...task, scheduleStart: new Date(task.scheduleStart!) }))
    // Ensure it's a past task
    .filter((task) => task.scheduleStart < today)
    // Sort by most recent first
    .sort((a, b) => b.scheduleStart.getTime() - a.scheduleStart.getTime());

  const recentPastTask = pastTasks.length > 0 ? pastTasks[0] : null;

  // Get upcoming task
  const upcomingTasks = tasks
    ?.filter((task) => task.scheduleStart)
    .map((task) => ({ ...task, scheduleStart: new Date(task.scheduleStart!) }))
    .filter((task) => task.scheduleStart > today)
    .sort((a, b) => b.scheduleStart.getTime() - a.scheduleStart.getTime());

  const upComingTask = upcomingTasks.length > 0 ? upcomingTasks[0] : null;

  return (
    <main>
      <DayHeader crumb="My Day" />
      <div className="overflow-y-scroll h-[80dvh] hide-scrollbar">
        {recentPastTask ? (
          <SingleDayCard
            showCard={showPrevious}
            setShowCard={setShowPrevious}
            toggleDeets={() => ""}
            showDeet={false}
            mainText="Overdue"
            header={recentPastTask.task_title}
            theDay="Yesterday"
            dayAlarm={<LuCalendarDays />}
            bodyText={recentPastTask.task_body}
            taskCategory={recentPastTask.taskCategory}
          />
        ) : (
          <p className="font-medium text-base text-priFont ml-[1rem]">
            No past events
          </p>
        )}

        <DayCard
          setShowCard={setShowToday}
          showCard={showToday}
          toogleDeetButton={<IoIosArrowDown />}
          toogleDeetButtonTwo={<IoIosArrowUp />}
          showDeet={showDeet}
          toggleDeets={toggleDeets}
          mainText="Today"
          theDay="Today"
          dayAlarm={<MdOutlineAccessAlarms />}
          arrayTask={todaysTasks}
        />
        {upComingTask && (
          <SingleDayCard
            setShowCard={setShowUpcoming}
            showCard={showUpcoming}
            showDeet={false}
            toggleDeets={toggleDeets}
            mainText="Upcoming"
            header={upComingTask.task_title}
            theDay={timeAgo.format(upComingTask.scheduleStart)}
            dayAlarm={<SvgViewer svgFile={wand} className="size-4" />}
            bodyText={upComingTask.task_body}
            taskCategory={upComingTask.taskCategory}
          />
        )}
      </div>
    </main>
  );
}
