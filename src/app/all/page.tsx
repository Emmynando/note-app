"use client";
import { useState } from "react";
import DayHeader from "@/components/UI/Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DayCard from "@/components/Layout/MyApp/DayCard";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { filterTasksByDay } from "@/utils/helpers";
import { useGetTasksQuery } from "@/store/taskApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UnAuth from "@/components/UI/UnAuthPage";
import unAuthImg from "../../../public/unAuth/allTask.png";

export default function AllScreen() {
  const userId = useSelector((state: RootState) => state.user.userId);

  const [showDeet, setShowDeet] = useState(false);
  const showPastDeet = true;
  const showUpComingDeet = true;
  const [showPast, setShowPast] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showToday, setShowToday] = useState(true);

  function toggleDeets() {
    setShowDeet((prevState) => !prevState);
  }

  // to get all related task
  const { data: tasksResponse, error } = useGetTasksQuery(userId as string, {
    // Don't fetch if userId is missing
    skip: !userId,
  });

  if (error) {
    console.log("Error Fetching Task:", error);
  }

  const tasks = tasksResponse?.data || [];

  const pastTasks = filterTasksByDay(tasks, "past");
  const todaysTasks = filterTasksByDay(tasks, "today");
  const upcomingTasks = filterTasksByDay(tasks, "upcoming");

  if (!userId) {
    return <UnAuth unAuthImage={unAuthImg} />;
  }

  return (
    <main>
      <DayHeader crumb="All" />
      <div className="overflow-y-scroll h-[80dvh] hide-scrollbar">
        <DayCard
          setShowCard={setShowPast}
          showCard={showPast}
          toogleDeetButton={<IoIosArrowDown />}
          toogleDeetButtonTwo={<IoIosArrowUp />}
          showDeet={showPastDeet}
          toggleDeets={() => setShowPast((prevState) => !prevState)}
          mainText="Overdue"
          theDay="Overdue"
          dayAlarm={<MdOutlineAccessAlarms />}
          arrayTask={pastTasks}
        />
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
        <DayCard
          setShowCard={setShowUpcoming}
          showCard={showUpcoming}
          toogleDeetButton={<IoIosArrowDown />}
          toogleDeetButtonTwo={<IoIosArrowUp />}
          showDeet={showUpComingDeet}
          toggleDeets={() => setShowUpcoming((prevState) => !prevState)}
          mainText="Upcoming"
          theDay="Upcoming"
          dayAlarm={<MdOutlineAccessAlarms />}
          arrayTask={upcomingTasks}
        />
      </div>
    </main>
  );
}
