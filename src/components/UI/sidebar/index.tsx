"use client";
import { useState } from "react";
import AddTask from "./AddTask";
import Profile from "./Profile";
import Projects from "./Projects";
import WorkSpace from "./WorkSpace";
import { FiPlus } from "react-icons/fi";
import { RiMenuAddFill } from "react-icons/ri";
import clsx from "clsx";

export default function Sidebar({ onClick }: { onClick: () => void }) {
  const [showList, setShowList] = useState(false);

  function handleToggle() {
    setShowList((prev) => !prev);
  }

  return (
    <main className="absolute inset-0 z-40 bg-[#2f3136] w-[15%] h-dvh">
      <Profile showList={showList} handleToggle={handleToggle} />
      <div
        className={clsx(
          "scrollbar-custom overflow-y-scroll scroll-smooth",
          showList ? "h-[60%]" : "h-[75%]"
        )}>
        <AddTask />
        <WorkSpace />
        <Projects />
      </div>
      <div className="px-4 absolute shadow-custom w-full bottom-[5%] bg-[#2f3136]">
        <div className="flex justify-between py-2">
          <button
            className="flex items-center gap-2 hover:text-priText text-base"
            onClick={onClick}>
            <FiPlus className="size-18" />
            New List
          </button>
          <span className="flex items-center justify-center p-2 rounded-full size-8">
            {" "}
            <RiMenuAddFill />
          </span>
        </div>
      </div>
    </main>
  );
}
