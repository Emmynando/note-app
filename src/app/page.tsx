"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/UserReducer";
import DayCard from "@/components/Layout/MyApp/DayCard";
import { useSelector } from "react-redux";
import { setTasks } from "@/store/TaskReducer";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { api } from "@/utils/baseUrl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RootState } from "@/store/store";
import DayHeader from "@/components/UI/Header";
import ProgressBar from "@/components/Layout/MyApp/PogressBar";
import wand from "../../public/svg/wand.svg";
import SvgViewer from "@/components/UI/SVGViewer";
import { useGetTasksQuery } from "@/store/taskApi";

export default function Home() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);
  const userToken = useSelector((state: RootState) => state.user.userToken);
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

  // const response = await fetchWithToken(
  //   `${api}/task/${userId}`,
  //   { method: "GET" },
  //   userToken,
  //   dispatch
  // );

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

  console.log(todaysTasks);

  return (
    <main>
      <DayHeader crumb="My Day" />
      <DayCard
        showCard={showPrevious}
        setShowCard={setShowPrevious}
        toggleDeets={() => ""}
        showDeet={false}
        mainText="Overdue"
        header="Call Jason"
        theDay="Yesterday"
        dayAlarm={<LuCalendarDays />}
        bodyText="Email Mrs. James for the new intern we have next week from Alex
                Carter, a marketing student from Brookfield University. Confirm
                their start date, schedu..."
      />
      <div>
        {todaysTasks && todaysTasks?.length > 0 ? (
          todaysTasks.map((task) => (
            <DayCard
              setShowCard={setShowToday}
              showCard={showToday}
              toogleDeetButton={<IoIosArrowDown />}
              toogleDeetButtonTwo={<IoIosArrowUp />}
              showDeet={showDeet}
              toggleDeets={toggleDeets}
              todayDate={task.scheduleStart}
              mainText="Today"
              header={task.task_title}
              theDay="Today"
              dayAlarm={<MdOutlineAccessAlarms />}
              bodyText={task.task_body}
            />
          ))
        ) : (
          <p>No tasks for today.</p>
        )}
        {showToday && <ProgressBar />}
      </div>
      <DayCard
        setShowCard={setShowUpcoming}
        showCard={showUpcoming}
        showDeet={false}
        toggleDeets={toggleDeets}
        mainText="Upcoming"
        header="Black Friday"
        theDay="Tomorrow"
        dayAlarm={<SvgViewer svgFile={wand} className="size-4" />}
        bodyText="Email Mrs. James for the new intern we have next week from Alex
                Carter, a marketing student from Brookfield University. Confirm
                their start date, schedu..."
      />
    </main>
  );
}
