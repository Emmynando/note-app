"use client";
import { useState } from "react";
import DayCard from "@/components/Layout/MyApp/DayCard";
import DayHeader from "@/components/UI/Header";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProgressBar from "@/components/Layout/MyApp/PogressBar";
import wand from "../../../public/svg/wand.svg";
import SvgViewer from "@/components/UI/SVGViewer";

export default function MyDay() {
  const [showPrevious, setShowPrevious] = useState(true);
  const [showToday, setShowToday] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showDeet, setShowDeet] = useState(false);
  function toggleDeets() {
    setShowDeet((prevState) => !prevState);
  }

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
        <DayCard
          setShowCard={setShowToday}
          showCard={showToday}
          toogleDeetButton={<IoIosArrowDown />}
          toogleDeetButtonTwo={<IoIosArrowUp />}
          showDeet={showDeet}
          toggleDeets={toggleDeets}
          todayDate="10th"
          mainText="Today"
          header="Email Back Mrs James"
          theDay="Today"
          dayAlarm={<MdOutlineAccessAlarms />}
          bodyText="Email Mrs. James for the new intern we have next week from Alex
        Carter, a marketing student from Brookfield University. Confirm
        their start date, schedu..."
        />
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
