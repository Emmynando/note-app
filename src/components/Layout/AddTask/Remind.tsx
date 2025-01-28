import DatePickerComp from "./DatePicker";

export default function RemindMe({ handleDateChange }) {
  return <DatePickerComp onDateChange={handleDateChange} />;
}
