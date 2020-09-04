import * as React from "react";

export interface DatePickerTopNavProps {
  onPrevMonthClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onNextMonthClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onTodayClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const DatePickerTopNav: React.FC<DatePickerTopNavProps> = ({
  onPrevMonthClick,
  onNextMonthClick,
  onTodayClick,
}) => {
  return (
    <nav className="btn-group w-100 d-flex mb-3">
      <button
        className="btn btn-outline-dark btn-sm flex-grow-0"
        onClick={onPrevMonthClick}
      >
        Prev
      </button>
      <button
        onClick={onTodayClick}
        className="btn btn-outline-dark btn-sm flex-grow-1"
      >
        Today
      </button>
      <button
        className="btn btn-outline-dark btn-sm flex-grow-0"
        onClick={onNextMonthClick}
      >
        Next
      </button>
    </nav>
  );
};
