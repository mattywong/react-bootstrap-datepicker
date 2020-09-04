import * as React from "react";
import {
  getDate,
  isToday,
  isWithinInterval,
  Interval,
  isDate,
  isSameDay,
} from "date-fns";
import classNames from "classnames";
import { generateMonthDatesArray, chunk } from "../util";
import { Modifiers } from "./types";

export const tdStyles: React.HTMLAttributes<
  HTMLTableDataCellElement
>["style"] = {
  width: `${100 / 7}%`,
  height: 0,
  paddingTop: `${100 / 7}%`,
  position: "relative",
};

export interface DatePickerTableProps {
  date: Date;
  modifiers?: Modifiers;

  onDayClick: (date: Date) => void;
}
export const DatePickerTable: React.FC<DatePickerTableProps> = ({
  date,
  modifiers,
  onDayClick,
}) => {
  const chunkedDaysInMonth = React.useMemo(() => {
    return chunk(generateMonthDatesArray(date), 7);
  }, [date]);

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr className="text-center">
          <th>
            <abbr title="Sunday">Su</abbr>
          </th>
          <th>
            <abbr title="Monday">Mo</abbr>
          </th>
          <th>
            <abbr title="Tuesday">Tu</abbr>
          </th>
          <th>
            <abbr title="Wednesday">We</abbr>
          </th>
          <th>
            <abbr title="Thursday">Th</abbr>
          </th>
          <th>
            <abbr title="Friday">Fr</abbr>
          </th>
          <th>
            <abbr title="Saturday">Sa</abbr>
          </th>
        </tr>
      </thead>
      <tbody>
        {chunkedDaysInMonth.map((dayChunk, idx) => {
          return (
            <tr key={idx}>
              {dayChunk.map((_date, dayIdx) => {
                return (
                  <td key={dayIdx} className="text-center" style={tdStyles}>
                    <button
                      type="button"
                      style={Object.assign(
                        {
                          top: 0,
                          left: 0,
                          position: "absolute",

                          width: "100%",
                          height: "100%",
                          background: "transparent",
                          border: "none",
                          padding: 0,
                        },
                        isToday(_date) && {
                          borderRadius: "50%",
                        }
                      )}
                      className={classNames({
                        "border border-info": isToday(_date),
                        "bg-info": (() => {
                          if (!modifiers) {
                            return false;
                          }

                          if (modifiers?.start && modifiers?.end) {
                            if (
                              isDate(modifiers.start) &&
                              isDate(modifiers.end)
                            ) {
                              return isWithinInterval(
                                _date,
                                modifiers as Interval
                              );
                            }

                            return false;
                          }

                          if (
                            modifiers.start &&
                            isDate(modifiers.start) &&
                            isSameDay(_date, modifiers.start)
                          ) {
                            return true;
                          }
                        })(),
                      })}
                      onClick={(e) => {
                        onDayClick(_date);
                      }}
                    >
                      {getDate(_date)}
                    </button>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
