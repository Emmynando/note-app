"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentEvent from "./AppointmentEvent";
import clsx from "clsx";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetTasksQuery } from "@/store/taskApi";

const localizer = momentLocalizer(moment);
type Keys = keyof typeof Views;

export const VIEW_OPTIONS = [
  {
    id: Views.WEEK,
    label: "Week",
  },
  {
    id: Views.DAY,
    label: "Day",
  },
  { id: Views.MONTH, label: "Month" },
];

const CalendarComponent = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [isMonth, setMonth] = useState(
    date.toLocaleString("en-US", { month: "long" })
  );

  useEffect(() => {
    setMonth(date.toLocaleString("en-US", { month: "long" }));
  }, [date]);

  // to get all related task
  const { data: tasksResponse, error } = useGetTasksQuery(userId as string, {
    // Don't fetch if userId is missing
    skip: !userId,
  });

  if (error) {
    console.log("Error Fetching Task:", error);
  }

  const events = useMemo(() => {
    if (!tasksResponse?.data) return [];

    return tasksResponse.data.map((task: any) => {
      const start = new Date(task.scheduleStart);
      const end = task.scheduleEnd
        ? new Date(task.scheduleEnd)
        : new Date(start.getTime() + 60 * 60 * 1000);

      return {
        id: task.id,
        title: task.task_title,
        start,
        category: task.taskCategory,
        scheduleStart: task.scheduleStart,
        end,
        allDay: false,
      };
    });
  }, [tasksResponse]);

  const components = useMemo(
    () => ({
      event: ({ event }: any) => {
        return <AppointmentEvent task={event} />;
      },
    }),
    []
  );

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, "w").toDate());
    } else {
      setDate(moment(date).add(1, "M").toDate());
    }
  }, [view, date]);

  const handleViewChange = useCallback((newView: (typeof Views)[Keys]) => {
    setView(newView);
  }, []);

  const onPrevClick = useCallback(() => {
    let newDate: Date;

    if (view === Views.DAY) {
      newDate = moment(date).subtract(1, "d").toDate();
    } else if (view === Views.WEEK) {
      newDate = moment(date).subtract(1, "w").toDate();
    } else if (view === Views.MONTH) {
      newDate = moment(date).subtract(1, "M").toDate();
    } else {
      newDate = date;
    }

    setDate(newDate);
  }, [view, date]);

  // console.log(testEvents);
  return (
    <div className="p-4">
      {/* buttons */}
      <div className="flex justify-between items-center">
        {/* month */}
        <div className="flex items-center gap-4">
          <button onClick={onPrevClick}>
            <RiArrowLeftSLine className="text-xl font-500 size-[2rem]" />
          </button>
          <p className="font-500 text-xl">{isMonth}</p>

          <button onClick={onNextClick}>
            <RiArrowRightSLine className="text-xl font-500 size-[2rem]" />
          </button>
        </div>
        {/* week and days */}
        <div className=" flex gap-2">
          {VIEW_OPTIONS.filter((items) => items.label !== "Month").map(
            ({ id, label }) => (
              <button
                onClick={() => setView(id)}
                className={clsx(
                  "font-500 text-xl p-2",
                  id === view &&
                    "text-[#A4C6ED] bg-[#2a2b2e] rounded-md shadow-custom"
                )}
                key={id}>
                {label}
              </button>
            )
          )}
        </div>
      </div>
      <div className="relative">
        <Calendar
          localizer={localizer}
          // Pass the events array
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          view={view}
          toolbar={false}
          step={60} // 60 minutes per slot
          timeslots={1} // Single slot per hour
          style={{
            height: 450,
            margin: "0 auto",
          }}
          className="shadow-lg bg-inherit"
          components={components}
          date={date} // Pass the `date` state
          onNavigate={(newDate) => setDate(newDate)} // Sync navigation
          onView={(newView) => handleViewChange(newView)} // Sync view change
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
