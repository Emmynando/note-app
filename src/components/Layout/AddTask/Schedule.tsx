import DatePickerComp from "./DatePicker";

export default function Schedule({ handleDateChange }) {
  return <DatePickerComp onDateChange={handleDateChange} />;
}
