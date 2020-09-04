import * as React from "react";
import { addMonths, subMonths, setMonth } from "date-fns";
import { DropdownMenuBtn } from "./DropdownMenuBtn";
import { KeyValue } from "./types";

const MONTHS = Array.from({ length: 12 }).map((_, idx) => {
  return {
    value: idx,
    label: new Intl.DateTimeFormat("en-au", {
      month: "long",
    }).format(new Date(0, idx)),
  } as KeyValue;
});

const useDropdown = () => {
  const [state, setState] = React.useState(() => {
    return {
      open: false,
    };
  });

  const closeDropdown = () =>
    setState((prev) => ({
      ...prev,
      open: false,
    }));

  const openDropdown = () =>
    setState((prev) => ({
      ...prev,
      open: true,
    }));

  const toggleDropdown = () =>
    setState((prev) => ({
      ...prev,
      open: !prev.open,
    }));

  return {
    open: state.open,
    onFocus: (e) => {
      openDropdown();
    },
    onBlur: (e) => {
      closeDropdown();
    },
    closeDropdown,
  };
};

export interface DatePickerHeaderProps<T> {
  date: Date;
  onChange: (date: Date) => void;
}

export const DatePickerHeader = <T extends unknown>({
  date,
  onChange,
}: DatePickerHeaderProps<T>): ReturnType<
  React.FC<DatePickerHeaderProps<T>>
> => {
  const monthDropdown = useDropdown();
  return (
    <header className="d-flex mb-3 mx-n3">
      <DropdownMenuBtn
        id="month"
        value={MONTHS[date.getMonth()]}
        options={MONTHS}
        renderValue={(option) => {
          return option.label;
        }}
        renderLabel={(option) => {
          return option.label;
        }}
        onChange={(option) => {
          onChange(setMonth(date, option.value));
          monthDropdown.closeDropdown();
        }}
        {...monthDropdown}
      />

      <div tabIndex={-1}>
        <button
          type="button"
          className="form-control form-control-lg border-0 dropdown-toggle"
        >
          2020
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-item"></li>
        </ul>
      </div>
    </header>
  );
};
