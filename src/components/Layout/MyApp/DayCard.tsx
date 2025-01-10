"use client";
import { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { TiStarOutline } from "react-icons/ti";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { Flip } from "gsap/all";

gsap.registerPlugin(Flip);

interface DayCardProps {
  mainText: string;
  bodyText: string;
  header: string;
  theDay: string;
}
export default function DayCard({
  mainText,
  header,
  theDay,
  bodyText,
}: DayCardProps) {
  const [showCard, setShowCard] = useState(true);
  const [showDeet, setShowDeet] = useState(false);

  function toogleDeets() {
    if (showCard) {
      setShowDeet((prevState: any) => !prevState);
    }
  }

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
          onClick={() => setShowCard((prev) => !prev)}>
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
                onClick={toogleDeets}>
                {showDeet ? <IoIosArrowDown /> : <IoIosArrowUp />}
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
              <p className="text-xs font-medium text-[#FF7C66]">{theDay}</p>
              <span className="size-2 rounded-full bg-secFade" />
              <p className="text-xs font-medium text-secFade"> Tasks</p>
            </div>
            <div className="flex items-center gap-4 ">
              <p className="text-xl font-medium text-prifont">
                <TiStarOutline />
              </p>
              <p className="font-medium text-prifont">
                <LuCalendarDays />
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
