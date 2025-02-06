import { TiStarFullOutline } from "react-icons/ti";
import magicWand from "../../../../public/svg/wand.svg";
import Image from "next/image";

export default function AppointmentEvent({ task }) {
  const { category, title, scheduleStart } = task;
  console.log("card", task);

  return (
    <main className="relative flex flex-col h-dvh shadow-custom bg-[#2f3033] rounded-sm">
      <div className="flex flex-col justify-between h-[40%] p-2">
        <div className="">
          <p className="font-500 text-xs text-priFont mb-2">{title}</p>
          <p className="font-500 text-[10px] text-[#14AE5C]">{category}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className={"text-xl font-medium text-prifont"}>
              <TiStarFullOutline className="text-[#FF7C66]" />
            </p>
            <span className={"size-4 font-medium text-prifont"}>
              <Image src={magicWand} width={0} height={0} alt="" />
            </span>
          </div>
          <p className="text-[10px]"> {scheduleStart}</p>
        </div>
      </div>
    </main>
  );
}
