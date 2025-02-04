import { PiHashStraightBold } from "react-icons/pi";
import moment from "moment";
import { EventItem } from "@/types";

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
