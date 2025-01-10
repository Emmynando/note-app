import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { PiHashStraightBold } from "react-icons/pi";

export const navCalander = [
  {
    id: "1",
    icon: MdOutlineWbSunny,
    text: "My Day",
    count: "0",
  },
  {
    id: "2",
    icon: LuCalendarDays,
    text: "Calender",
    count: "0",
  },
];

export const navWorkspace = [
  {
    id: "1",
    icon: CiBoxList,
    text: "All",
    count: "0",
  },
  {
    id: "2",
    icon: FaTasks,
    text: "Tasks",
    count: "0",
  },
  {
    id: "3",
    icon: GrNotes,
    text: "Notes",
    count: "0",
  },
];
export const navProjects = [
  {
    id: "1",
    icon: PiHashStraightBold,
    text: "Tech-Upgrade",
    count: "0",
  },
  {
    id: "2",
    icon: PiHashStraightBold,
    text: "Tasks",
    count: "0",
  },
];
