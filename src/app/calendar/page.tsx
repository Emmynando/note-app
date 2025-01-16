import CalendarComponent from "@/components/Layout/Calendar/CalendarComp";
import DayHeader from "@/components/UI/Header";

export default function Calendar() {
  return (
    <main className="h-full !overflow-hidden relative">
      <DayHeader crumb="Calendar" />
      <CalendarComponent />
    </main>
  );
}
