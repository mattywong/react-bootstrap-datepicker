import * as React from "react";

import { CalendarDateRange } from "./components/CalendarDateRange";

export const CalendarRange = () => {
  const [state, setState] = React.useState(() => {
    return {
      startDate: undefined,
      endDate: undefined,
    };
  });
  return (
    <div className="container pt-4">
      <CalendarDateRange
        startDate={state.startDate}
        endDate={state.endDate}
        // months={1}
      />
    </div>
  );
};
