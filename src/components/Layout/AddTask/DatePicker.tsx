"use client";
import React, { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import {
  TbArrowBigRightLinesFilled,
  TbArrowBigLeftLinesFilled,
} from "react-icons/tb";

interface DatePickerProps {
  className: string;
  children: ReactNode;
}

interface DatePickerCompProps {
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const DatePickerComp = ({ onDateChange }: DatePickerCompProps) => {
  const selectedDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Pass the updated dates to the parent via the callback
    onDateChange({ startDate: start, endDate: end });
  };

  const MyContainer = ({ className, children }: DatePickerProps) => {
    return (
      <div style={{ padding: "16px" }}>
        <div className={className}>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        selectsRange
        inline // Ensures the calendar is always open
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={decreaseMonth}>
              <TbArrowBigLeftLinesFilled />
            </button>
            <span>{monthDate.toLocaleDateString()}</span>
            <button onClick={increaseMonth}>
              <TbArrowBigRightLinesFilled />
            </button>
          </div>
        )}
        calendarContainer={({ className, children }) => (
          <MyContainer className={className}>{children}</MyContainer>
        )}
        className="custom-datepicker"
      />
    </main>
  );
};

export default DatePickerComp;
