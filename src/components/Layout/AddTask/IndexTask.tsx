"use client";
import { useTask } from "@/store/AddListProvider";
import General from "./General";
import Schedule from "./Schedule";
import TaskHeader from "./TaskHeader";

export default function IndexTask() {
  const { showAddList } = useTask();

  if (!showAddList) return null;
  return (
    // showAddList && (
    <main
      className="absolute z-50 flex items-center justify-center w-[100%] h-dvh 
    top-0 overflow-hidden bg-bgBlur">
      <div className="h-3/4 w-4/5 bg-[#1e1e20] rounded-md border border-[#393a3b]">
        <TaskHeader />
        {/* <General /> */}
        <Schedule />
      </div>
    </main>
    // )
  );
}
