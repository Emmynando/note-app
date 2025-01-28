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

  if (!showAddList) return null;

  const toggleComponent = (component: "General" | "Schedule" | "Remind") => {
    setActiveComponent(component);
    console.log(activeComponent);
  };
  return (
    // showAddList && (
    <main
      className="absolute z-50 flex items-center justify-center w-[100%] h-dvh 
    top-0 overflow-hidden bg-bgBlur">
      <div className="h-3/4 w-4/5 bg-[#1e1e20] rounded-md border border-[#393a3b]">
        <TaskHeader
          handleGeneral={() => toggleComponent("General")}
          handleRemind={() => toggleComponent("Remind")}
          handleSchedule={() => toggleComponent("Schedule")}
          activeComp={activeComponent}
        />
        {activeComponent === "General" && <GeneralIndex />}
        {activeComponent === "Remind" && <RemindMe />}
        {activeComponent === "Schedule" && <Schedule />}
      </div>
    </main>
    // )
  );
}
