import CalendarComponent from "@/components/Layout/Calendar/CalendarComp";
import DayHeader from "@/components/UI/Header";

export default function Calendar() {
  return (
    <main>
      <DayHeader crumb="Calendar" />
      <CalendarComponent />
    </main>
  );
}
