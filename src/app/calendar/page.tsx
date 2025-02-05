"use client";
import CalendarComponent from "@/components/Layout/Calendar/CalendarComp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DayHeader from "@/components/UI/Header";
import UnAuth from "@/components/UI/UnAuthPage";
import calendar from "../../../public/unAuth/calendar.png";

export default function Calendar() {
  const userId = useSelector((state: RootState) => state.user.userId);
  if (!userId) {
    return <UnAuth unAuthImage={calendar} />;
  }

  return (
    <main className="h-full !overflow-hidden relative">
      <DayHeader crumb="Calendar" />
      <CalendarComponent />
    </main>
  );
}
