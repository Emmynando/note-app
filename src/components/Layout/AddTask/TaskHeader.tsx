"use client";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { useTask } from "@/store/AddListProvider";
import clsx from "clsx";

const CATEGORIES = ["Project", "Appointment", "Tasks", "Notes", "Others"];

export default function TaskHeader({
  handleGeneral,
  handleRemind,
  handleSchedule,
  handleAddTask,
  activeComp,
  category,
  onCategoryChange,
}) {
  const { closeAddListModal } = useTask();
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
            activeComp === "Schedule" && "!text-[#a4c6ed]"
          )}
          onClick={() => handleSchedule()}>
          Schedule
        </button>
        <button
          className={clsx(
            "font-medium text-[#e0e0e0] p-2",
            activeComp === "Remind" && "!text-[#a4c6ed]"
          )}
          onClick={() => handleRemind()}>
          Remind Me
        </button>
        <select
          className="bg-inherit font-medium text-[#e0e0e0] [&>*]:bg-[#1e1e20] 
          p-2 outline-none focus:outline-none border-r border-secFade"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="" disabled hidden>
            Category
          </option>
          {CATEGORIES.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-[#1e1f21] text-[#a4c6ed]">
              {category}
            </option>
          ))}
        </select>
        <button
          className="font-medium text-[#a4c6ed] p-2"
          onClick={handleAddTask}>
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
