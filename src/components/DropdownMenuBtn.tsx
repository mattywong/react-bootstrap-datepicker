import * as React from "react";
import * as classNames from "classnames";

export interface DropdownMenuBtnProps<T> {
  id: string;
  value: T;
  options: T[];
  renderLabel: (option: T) => React.ReactNode;
  renderValue: (option: T) => React.ReactNode;
  onChange: (option: T) => void;
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  open?: boolean;
}

export const DropdownMenuBtn = <T extends unknown>({
  id,
  value,
  options,
  renderLabel,
  renderValue,
  open = false,
  onChange,
  onFocus,
  onBlur,
}: DropdownMenuBtnProps<T>): ReturnType<
  React.FunctionComponent<DropdownMenuBtnProps<T>>
> => {
  return (
    <div
      tabIndex={-1}
      className="mr-2 position-relative"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span id={`${id}_select`} className="sr-only">
        Select month
      </span>
      <button
        type="button"
        className="form-control form-control-lg border-0 dropdown-toggle"
        id="dropdown__btn"
        aria-labelledby="dropdown__btn"
        aria-haspopup="listbox"
      >
        {renderValue(value)}
      </button>
      <ul
        id="dropdown__header"
        className={classNames("dropdown-menu", {
          show: open,
        })}
        style={{
          maxHeight: "10rem",
          overflow: "auto",
        }}
        aria-labelledby={`${id}_select`}
      >
        {options.map((option, idx) => (
          <li
            id={`datepicker__month_${idx}`}
            key={idx}
            className={classNames("dropdown-item", {
              active: value === option,
            })}
            role="option"
            aria-selected={value === option}
            onClick={(e) => {
              onChange(option);
            }}
          >
            {renderLabel(option)}
          </li>
        ))}
      </ul>
    </div>
  );
};
