"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentEvent from "./AppointmentEvent";
import { EVENTS, VIEW_OPTIONS } from "@/components/constant";
import clsx from "clsx";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

const localizer = momentLocalizer(moment);
type Keys = keyof typeof Views;

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [isMonth, setMonth] = useState(
    date.toLocaleString("en-US", { month: "long" })
  );

  // Update the month name when `date` changes
  useEffect(() => {
    setMonth(date.toLocaleString("en-US", { month: "long" }));
  }, [date]);

  const components: any = {
    event: ({ event }: any) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;

      return null;
    },
  };

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
                )}>
                {label}
              </button>
            )
          )}
        </div>
      </div>
      <div className="relative">
        <Calendar
          localizer={localizer}
          events={EVENTS}
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
