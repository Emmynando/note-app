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

export default function RemindMe({
  onDateChange,
}: {
  onDateChange: (date: Date | null) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    // Pass the selected date to the parent component via the callback
    onDateChange(date);
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
        selected={selectedDate} // Bind selected date
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
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
}
