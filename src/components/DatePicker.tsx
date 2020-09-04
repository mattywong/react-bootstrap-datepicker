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
import { DatePickerTable, DatePickerTableProps } from "./DatePickerTable";

import type { Modifiers } from "./types";

interface DatePickerProps {
  defaultValue?: Date;
  modifiers?: Modifiers;
  onDayClick: DatePickerTableProps["onDayClick"];
}

export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue = new Date(),
  modifiers,
  onDayClick,
}) => {
  const [date, setDate] = React.useState(defaultValue);

  return (
    <div>
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
      <DatePickerTable
        date={date}
        modifiers={modifiers}
        onDayClick={onDayClick}
      />
    </div>
  );
};
