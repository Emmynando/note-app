"use client";
import { useState } from "react";
import { useTask } from "@/store/AddListProvider";
import Schedule from "./Schedule";
import GeneralIndex from "./General";
import TaskHeader from "./TaskHeader";
import RemindMe from "./Remind";
import { api } from "@/API/baseUrl";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchWithToken } from "@/API/RequestWrapper";
import { useDispatch } from "react-redux";

interface DateProps {
  startDate: Date | null;
  endDate: Date | null;
}

export default function IndexTask() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);
  const userToken = useSelector((state: RootState) => state.user.userToken);
  const { showAddList } = useTask();
  const [activeComponent, setActiveComponent] = useState<
    "General" | "Schedule" | "Remind"
  >("General");
  const [category, setCategory] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskbody, setTaskBody] = useState("");
  const [selectedRemindDates, setSelectedRemindDates] = useState<DateProps>({
    startDate: null,
    endDate: null,
  });
  const [selectedScheduleDates, setSelectedScheduleDates] = useState<DateProps>(
    { startDate: null, endDate: null }
  );

  // for handle Reminder
  const handleRemindDateChange = (date: Date | null) => {
    setSelectedRemindDates({
      startDate: date, // This includes the selected date and time
      endDate: date, // Optionally same as startDate
    });
  };
  // for handle schedule
  const handleScheduleDateChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setSelectedScheduleDates(dates);
  };
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  if (!showAddList) return null;

  const toggleComponent = (component: "General" | "Schedule" | "Remind") => {
    setActiveComponent(component);
  };

  async function handleSubmitTask() {
    const todayDate = new Date();
    const taskData = {
      userId,
      task_title: taskTitle,
      task_body: taskbody,
      reminder: selectedRemindDates.startDate,
      scheduleStart: selectedScheduleDates.startDate,
      scheduleEnd: selectedScheduleDates.endDate,
      taskCategory: category,
    };

    // Find missing fields
    const missingFields = Object.entries(taskData)
      // Check for falsy values except schedule end (empty string, undefined, null, etc.)
      .filter(([key, value]) => !value && key !== "scheduleEnd")
      // Extract missing field names
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(`Invalid Fields: ${missingFields.join(", ")}`);
      return;
    }

    if (selectedScheduleDates.startDate) {
      const startDate = new Date(selectedScheduleDates.startDate);
      const endDate =
        selectedScheduleDates && selectedScheduleDates.endDate
          ? new Date(selectedScheduleDates.endDate)
          : null;
      const remindDate = selectedRemindDates.startDate
        ? new Date(selectedRemindDates.startDate)
        : null;
      // Get timestamps (milliseconds since epoch)
      const nowTime = todayDate.getTime();
      const startTime = startDate.getTime();
      const endTime = endDate ? endDate.getTime() : null;
      const remindTime = remindDate ? remindDate.getTime() : null;

      // Check if start date is in the past OR less than 15 minutes from now
      if (startTime < nowTime || startTime < nowTime + 15 * 60 * 1000) {
        toast.error("Scheduled date must be more than 15 minutes from now");
        return;
      }

      // Check if reminder is before the start date OR less than 15 minutes from now
      if (
        remindTime &&
        (remindTime > startTime ||
          remindTime < nowTime + 15 * 60 * 1000 ||
          remindTime === startTime ||
          remindTime < nowTime)
      ) {
        console.log(remindDate, startDate);
        toast.error(
          "Reminder must be at least 15 minutes before your scheduled time"
        );
        return;
      }

      if (endTime && remindTime && remindTime > endTime) {
        toast.error("Reminder Cannot be after event");
      }
    }

    try {
      if (!userId || !userToken) {
        console.log("user not found");
        return;
      }
      // const response = await fetch(`${api}/task/${userId}`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     task_title: taskTitle,
      //     task_body: taskbody,
      //     reminder: selectedRemindDates.startDate?.toISOString(),
      //     scheduleStart: selectedScheduleDates.startDate?.toISOString(),
      //     scheduleEnd: selectedScheduleDates.endDate?.toISOString(),
      //     taskCategory: category,
      //   }),
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${userToken}`,
      //   },
      // });

      const response = await fetchWithToken(
        `${api}/task/${userId}`,
        {
          method: "POST",
          body: JSON.stringify(taskData),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
        userToken,
        dispatch
      );

      // if (response?.ok) {

      //   console.log("Task saved:", data);
      // } else {
      //   console.error("Failed to save task");
      // }
      if (!response?.ok) {
        console.log(response);
      }
      toast.success("Successfull");
      // console.log(data);
    } catch {
      toast.error("server Error");
    }
  }

  return (
    <main
      className="absolute z-50 flex items-center justify-center w-[100%] h-dvh 
    top-0 overflow-hidden bg-bgBlur">
      <div className="h-3/4 w-4/5 bg-[#1e1e20] rounded-md border border-[#393a3b]">
        <TaskHeader
          handleGeneral={() => toggleComponent("General")}
          handleRemind={() => toggleComponent("Remind")}
          handleSchedule={() => toggleComponent("Schedule")}
          activeComp={activeComponent}
          handleAddTask={handleSubmitTask}
          category={category}
          onCategoryChange={handleCategoryChange}
        />
        {activeComponent === "General" && (
          <GeneralIndex
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskbody={taskbody}
            setTaskBody={setTaskBody}
          />
        )}
        {activeComponent === "Remind" && (
          <RemindMe onDateChange={handleRemindDateChange} />
        )}
        {activeComponent === "Schedule" && (
          <Schedule handleDateChange={handleScheduleDateChange} />
        )}
      </div>
    </main>
  );
}
