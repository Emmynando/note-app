"use client";
import { ReactNode } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { Flip } from "gsap/all";
import clsx from "clsx";

gsap.registerPlugin(Flip);

interface DayCardProps {
  mainText: string;
  bodyText: string;
  header: string;
  theDay: string;
  todayDate?: string;
  taskCategory?: string;
  dayAlarm: ReactNode;
  toogleDeetButton?: ReactNode;
  toogleDeetButtonTwo?: ReactNode;
  showDeet: boolean;
  showCard: boolean;
  setShowCard: (text: boolean) => void;
  toggleDeets: () => void;
}
export default function SingleDayCard({
  mainText,
  header,
  theDay,
  todayDate,
  bodyText,
  showDeet,
  taskCategory,
  toggleDeets,
  toogleDeetButton,
  toogleDeetButtonTwo,
  dayAlarm,
  showCard,
  setShowCard,
}: DayCardProps) {
  useGSAP(
    () => {
      if (showCard) {
        const state = Flip.getState("#card");
        // get initial state
        Flip.from(state, {
          targets: "#card",
          duration: 1,
          display: "block",
          scale: true,
        });

        // Trigger additional animations (like opacity)
        gsap.fromTo(
          "#card",
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: "elastic.out(1,0.3)" }
        );
      }
    },
    { dependencies: [showCard], revertOnUpdate: true }
  );

  return (
    <main className="container">
      <div className="flex gap-2 mb-2">
        <h2 className="font-medium text-xl">{mainText}</h2>
        <button
          className="font-semibold text-xl text-priFont"
          onClick={() => setShowCard(!showCard)}>
          {showCard ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      </div>

      {/* details part */}
      {showCard && (
        <div id="card" className="p-2 bg-[#2f3033] shadow-custom rounded-md">
          {/* <div className="border size-4 rounded-full self-center mb" /> */}
          <section className="flex items-center justify-between">
            <h2 className="check-box flex gap-2 items center font-medium text-base text-priFont">
              {header}
            </h2>
            <div className="flex items-end gap-4">
              <button
                className="font-semibold text-base text-priFont"
                onClick={toggleDeets}>
                {showDeet ? toogleDeetButton : toogleDeetButtonTwo}
              </button>
              <p className="font-semibold text-base text-priFont">...</p>
            </div>
          </section>
          {showDeet && (
            <section className="my-2 pl-4">
              <p className="text-fadeWhite text-xs w-2/3">{bodyText}</p>
            </section>
          )}
          <section className="flex justify-between items-center pl-4 mt-2">
            <div className="flex gap-2 items-center">
              <p
                className={clsx(
                  "text-xs font-medium text-[#EF4444]",
                  theDay !== "Yesterday" && "!text-[#FF7C66]"
                )}>
                {theDay}
              </p>
              {theDay === "Today" && (
                <span className="size-2 rounded-full bg-secFade" />
              )}
              <p
                className={clsx(
                  "text-xs font-medium text-[#EF4444]",
                  theDay !== "Yesterday" && "!text-[#FF7C66]"
                )}>
                {todayDate}
              </p>
              <span className="size-2 rounded-full bg-secFade" />
              <p className="text-xs font-medium text-secFade">
                {" "}
                {taskCategory}
              </p>
            </div>
            <div className="flex items-center gap-4 ">
              <p
                className={clsx(
                  "text-xl font-medium text-prifont",
                  theDay !== "Yesterday" && "!text-[#FF7C66]"
                )}>
                {theDay === "Yesterday" ? (
                  <TiStarOutline />
                ) : (
                  <TiStarFullOutline />
                )}
              </p>
              <div className="font-medium text-prifont">{dayAlarm}</div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
