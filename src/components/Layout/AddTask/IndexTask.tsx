"use client";
import { useState } from "react";
import { useTask } from "@/store/AddListProvider";
import Schedule from "./Schedule";
import GeneralIndex from "./General";
import TaskHeader from "./TaskHeader";
import RemindMe from "./Remind";

export default function IndexTask() {
  const { showAddList } = useTask();
  const [activeComponent, setActiveComponent] = useState<
    "General" | "Schedule" | "Remind"
  >("General");
  const [category, setCategory] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskbody, setTaskBody] = useState("");
  const [selectedRemindDates, setSelectedRemindDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const [selectedSchedileDates, setSelectedScheduleDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

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
    const taskData = {
      title: taskTitle,
      body: taskbody,
      reminder: selectedRemindDates.startDate,
      schedule: selectedSchedileDates,
      category,
    };
    console.log(taskData);
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
