import DayCard from "@/components/Layout/MyApp/DayCard";
import DayHeader from "@/components/Layout/MyApp/Header";

export default function MyDay() {
  return (
    <main>
      <DayHeader />
      <DayCard
        mainText="Overdue"
        header="Call Jason"
        theDay="Yesterday"
        bodyText="Email Mrs. James for the new intern we have next week from Alex
                Carter, a marketing student from Brookfield University. Confirm
                their start date, schedu..."
      />
    </main>
  );
}
