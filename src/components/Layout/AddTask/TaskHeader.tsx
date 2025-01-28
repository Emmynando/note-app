"use client";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { useTask } from "@/store/AddListProvider";
import clsx from "clsx";

export default function TaskHeader({
  handleGeneral,
  handleRemind,
  handleSchedule,
  activeComp,
}) {
  const { closeAddListModal } = useTask();
  console.log(activeComp);
  return (
    <main className="flex justify-between items-center bg-[#393a3b] py-2 rounded-t-md px-2">
      <div>
        <button
          className={clsx(
            "font-medium text-[#e3e3e8] p-2",
            activeComp === "General" && "!text-[#a4c6ed]"
          )}
          onClick={() => handleGeneral()}>
          General
        </button>
        <button
          className={clsx(
            "font-medium text-[#e0e0e0] p-2",
            activeComp === "Remind" && "!text-[#a4c6ed]"
          )}
          onClick={() => handleRemind()}>
          Remind Me
        </button>
        <button
          className={clsx(
            "font-medium text-[#e0e0e0] px-2 py-1 border-r border-secFade",
            activeComp === "Schedule" && "!text-[#a4c6ed]"
          )}
          onClick={() => handleSchedule()}>
          Schedule
        </button>
        {/* <button
          className={clsx(
            "font-medium text-[#e0e0e0] p-2",
            activeComponent === "Remind" && "!text-[#e0e0e0]"
          )}>
          Repeat
        </button> */}
        <button className="font-medium text-[#a4c6ed] p-2">
          {" "}
          <IoIosAdd className="inline-flex !text-[1.2rem] mb-[0.2rem]" /> Add
          Task
        </button>
      </div>
      <div className="flex justify-around gap-4 ">
        <IoClose
          className="text-priFont text-[1rem] "
          onClick={closeAddListModal}
        />
        <BsThreeDots />
      </div>
    </main>
  );
}
