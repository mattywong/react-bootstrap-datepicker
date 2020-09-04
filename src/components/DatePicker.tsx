import * as React from "react";
import {
  addMonths,
  subMonths,
  isSameMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  endOfMonth,
} from "date-fns";

import { DatePickerHeader } from "./DatePickerHeader";
import { DatePickerTopNav } from "./DatePickerTopNav";
import { DatePickerTable } from "./DatePickerTable";

interface DatePickerProps {
  defaultValue?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue = new Date(),
}) => {
  const [date, setDate] = React.useState(defaultValue);

  return (
    <>
      <div
        style={{
          width: "16rem",
        }}
        className="date-picker border p-4"
      >
        <DatePickerHeader
          date={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
        />
        <DatePickerTopNav
          onPrevMonthClick={(e) => {
            setDate((prev) => subMonths(prev, 1));
          }}
          onNextMonthClick={(e) => {
            setDate((prev) => addMonths(prev, 1));
          }}
          onTodayClick={(e) => {
            setDate(new Date());
          }}
        />
        <DatePickerTable date={date} />
      </div>
    </>
  );
};
