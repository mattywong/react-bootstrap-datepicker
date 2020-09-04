import * as React from "react";

import { DatePicker } from "./components/DatePicker";

export const CalendarRange = () => {
  const [state, setState] = React.useState(() => {
    return {
      startDate: undefined,
      endDate: undefined,
    };
  });
  return (
    <div>
      <DatePicker
        startDate={state.startDate}
        endDate={state.endDate}
        months={1}
      />
    </div>
  );
};
