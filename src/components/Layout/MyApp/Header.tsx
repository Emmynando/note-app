import { HiOutlineLightBulb } from "react-icons/hi2";
import { LuBarcode } from "react-icons/lu";

export default function DayHeader() {
  const date = new Date();

  // Format the date (e.g., "Thu 07, November")
  const dayName = date.toLocaleString("en-US", { weekday: "short" });
  // e.g., "November"
  const monthName = date.toLocaleString("en-US", { month: "long" });
  // e.g., 7
  const day = date.getDate();

  // Format the time (e.g., "4:40 PM")
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <main className="flex justify-between">
      <section>
        <h2 className="font-semibold text-[32px] text-[#e3e3e8]">My Day</h2>
      </section>

      {/* second div */}
      <section className="flex gap-4">
        <div>
          <p className="font-semibold text-[32px] text-[#e3e3e8]">{`${dayName} ${String(
            day
          ).padStart(2, "0")}, ${monthName}`}</p>
          <p className="font-semibold text-[28px] text-fadeWhite">{time}</p>
        </div>
        <div className="flex items-start gap-2 pt-[1rem]">
          <p className="font-semibold text-[#e0e0e0] text-[21px]">
            <LuBarcode />
          </p>
          <p className="font-semibold text-[#e0e0e0] text-[21px]">
            <HiOutlineLightBulb />
          </p>
        </div>
      </section>
    </main>
  );
}
