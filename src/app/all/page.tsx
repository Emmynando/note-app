"use client";
import { useState } from "react";
import DayHeader from "@/components/UI/Header";
import AllCard from "@/components/Layout/All/AllCard";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DayCard from "@/components/Layout/MyApp/DayCard";

export default function AllScreen() {
  const [showCard, setShowCard] = useState(true);
  const [showPrevious, setShowPrevious] = useState(true);
  const [showToday, setShowToday] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showDeet, setShowDeet] = useState(false);
  function toggleDeets() {
    setShowDeet((prevState: any) => !prevState);
  }
  return (
    <main>
      <DayHeader crumb="All" />
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
      <section>
        <div className="flex gap-2 mb-2 pl-2">
          <h2 className="font-medium text-xl">Tasks</h2>
          <button
            className="font-semibold text-xl text-priFont"
            onClick={() => setShowCard((prev: any) => !prev)}>
            {showCard ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
        </div>
        <div>
          <AllCard
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
        </div>
      </section>
    </main>
  );
}
