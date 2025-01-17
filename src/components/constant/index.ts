import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { PiHashStraightBold } from "react-icons/pi";
import moment from "moment";
import { EventItem } from "@/types";
// import { Views } from "react-big-calendar";

export const navCalander = [
  {
    id: "1",
    icon: MdOutlineWbSunny,
    text: "My Day",
    count: "0",
    href: "/myday",
  },
  {
    id: "2",
    icon: LuCalendarDays,
    text: "Calender",
    count: "0",
    href: "/calendar",
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

export const EVENTS: EventItem[] = [
  {
    start: moment("2025-01-14T14:00:00").toDate(),
    end: moment("2025-01-15T14:00:00").toDate(),
    data: {
      appointment: {
        id: 1,
        status: "P",
        category: "New York",
        resource: "Dr Alex",
        title: "call Them",
      },
    },
    resourceId: 1,
  },
  {
    start: moment("2025-01-15T12:00:00").toDate(),
    end: moment("2025-01-15T19:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        category: "Washington",
        resource: "Dr David",
        title: "Email Back Ms. James",
      },
    },
    resourceId: 2,
  },
];
