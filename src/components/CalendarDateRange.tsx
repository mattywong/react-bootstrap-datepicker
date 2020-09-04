import * as React from "react";
import { DatePicker } from "./DatePicker";

import {
  isWithinInterval,
  isAfter,
  isBefore,
  isSameDay,
  isDate,
} from "date-fns";

interface CalendarDateRangeProps {
  start?: Date;
  end?: Date;
}

export const CalendarDateRange: React.FC<CalendarDateRangeProps> = ({
  start,
  end,
}) => {
  const [state, setState] = React.useState(() => {
    return {
      start,
      end,
    };
  });

  const modifier = {
    start: state.start,
    end: state.end,
  };

  return (
    <div
      className="border p-3"
      style={{
        width: "16rem",
      }}
    >
      <pre>{JSON.stringify(modifier, null, 2)}</pre>
      <DatePicker
        onDayClick={(date) => {
          if (!state.start) {
            setState((prev) => ({
              ...prev,
              start: date,
            }));
            return;
          }

          if (isBefore(date, state.start)) {
            setState((prev) => ({
              ...prev,
              start: date,
            }));
            return;
          }

          if (!state.end) {
            setState((prev) => ({
              ...prev,
              end: date,
            }));
            return;
          }

          if (isAfter(date, state.end)) {
            setState((prev) => ({
              ...prev,
              end: date,
            }));
            return;
          }

          if (isSameDay(date, state.start) && isSameDay(date, state.end)) {
            setState((prev) => ({
              ...prev,
              start: undefined,
              end: undefined,
            }));
            return;
          }

          if (isSameDay(date, state.start)) {
            setState((prev) => ({
              ...prev,
              end: date,
            }));
            return;
          }

          if (isSameDay(date, state.end)) {
            setState((prev) => ({
              ...prev,
              start: date,
            }));
            return;
          }

          if (
            modifier &&
            "start" in modifier &&
            "end" in modifier &&
            isDate(modifier.start) &&
            isDate(modifier.end)
          ) {
            if (isWithinInterval(date, modifier as Interval)) {
              setState((prev) => ({
                ...prev,
                end: date,
              }));
            }
          }

          console.log(date);
        }}
        modifiers={modifier}
      />
    </div>
  );
};
