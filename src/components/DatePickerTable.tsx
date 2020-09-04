import * as React from "react";
import { getDate, isToday } from "date-fns";
import classNames from "classnames";
import { generateMonthDatesArray, chunk } from "../util";

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
}
export const DatePickerTable: React.FC<DatePickerTableProps> = ({ date }) => {
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
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody>
        {chunkedDaysInMonth.map((dayChunk, idx) => {
          return (
            <tr key={idx}>
              {dayChunk.map((day, dayIdx) => {
                return (
                  <td key={dayIdx} className="text-center" style={tdStyles}>
                    <button
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
                        isToday(day) && {
                          borderRadius: "50%",
                        }
                      )}
                      className={classNames({
                        "border border-info": isToday(day),
                      })}
                    >
                      {getDate(day)}
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
