"use client";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { useTask } from "@/store/AddListProvider";

export default function TaskHeader() {
  const { closeAddListModal } = useTask();
  return (
    <main className="flex justify-between items-center bg-[#393a3b] py-2 rounded-t-md px-2">
      <div>
        <button className="font-medium text-[#e0e0e0] p-2">General</button>
        <button className="font-medium text-[#e0e0e0] p-2">Remind Me</button>
        <button className="font-medium text-[#e0e0e0] p-2">Schedule</button>
        <button className="font-medium text-[#e0e0e0] p-2 border-r border-secFade">
          Repeat
        </button>
        <button className="font-medium text-[#e0e0e0] p-2">
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
