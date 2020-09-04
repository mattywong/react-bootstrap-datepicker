import * as React from 'react';
import './styles.css';
import { createGlobalStyle } from 'styled-components';
import {
  getYear,
  getMonth,
  getDaysInMonth,
  getDay,
  subDays,
  addDays,
  getDate,
  addMonths,
  subMonths,
  isToday,
  isSameMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

import classNames from 'classnames';

const chunk = <T extends unknown>(arr: T[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );
};

const GlobalStyles = createGlobalStyle`

  .date-picker {

  }

  .date-picker__day-btn {
    width: 2.8em;
    height: 2.8em;
    display: block;

    background: transparent;
    border: none;

    /* visibility: hidden;
    display: none; */

  }


  .date-picker__day-btn.is-today {
    color: red;

  }


`;

interface DatePickerProps {
  defaultValue?: Date;
  months?: number;
}

const generateMonthDatesArray = (date): Date[] => {
  const daysInMonth = getDaysInMonth(date);

  const firstMonthDate = startOfMonth(date);

  const monthsDates = Array.from({ length: daysInMonth }).map((_, idx) => {
    return new Date(getYear(date), getMonth(date), idx + 1);
  });

  const startOffset = getDay(firstMonthDate);

  const remainder =
    (daysInMonth + startOffset) % 7 === 0
      ? 0
      : 7 - ((daysInMonth + startOffset) % 7);

  const calendarRows = [
    ...Array.from({ length: startOffset }),
    ...monthsDates,
    ...Array.from({ length: remainder }),
  ].map((n, idx, arr) => {
    if (idx < startOffset) {
      return subDays(arr[startOffset] as Date, startOffset - idx) as Date;
    }

    if (idx > arr.length - remainder - 1) {
      return addDays(
        arr[arr.length - 1 - remainder] as Date,
        idx - arr.length + 1 + remainder,
      ) as Date;
    }

    return n as Date;
  });

  return calendarRows;
};

export const DatePicker = ({ defaultValue = new Date(), months = 1 }) => {
  const [date, setDate] = React.useState(defaultValue);

  const monthsArray = React.useMemo(() => {
    return Array.from({ length: months }).map((_, idx) => {
      return chunk(generateMonthDatesArray(addMonths(date, idx)), 7);
    });
  }, [months, date]);

  console.log(monthsArray);

  return (
    <>
      <GlobalStyles />

      <div className="date-picker">
        <div className="btn-group  d-flex">
          <button
            className="btn btn-dark flex-grow-0"
            onClick={(e) => {
              setDate((prev) => subMonths(prev, 1));
            }}
          >
            Prev
          </button>
          <button className="btn btn-dark flex-grow-1">Today</button>
          <button
            className="btn btn-dark flex-grow-0"
            onClick={(e) => {
              setDate((prev) => addMonths(prev, 1));
            }}
          >
            Next
          </button>
        </div>
        {monthsArray.map((month, monthIdx) => {
          return (
            <div key={monthIdx}>
              <h1>
                {new Intl.DateTimeFormat('en-au', {
                  month: 'long',
                  year: 'numeric',
                }).format(monthsArray[monthIdx][1][0])}
              </h1>
              <table>
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
                  {month.map((dayChunk, idx) => {
                    return (
                      <tr key={idx}>
                        {dayChunk.map((day, dayIdx) => {
                          return (
                            <td key={dayIdx}>
                              <button
                                className={classNames('date-picker__day-btn', {
                                  'is-today': isToday(day),
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
            </div>
          );
        })}
      </div>
    </>
  );
};
