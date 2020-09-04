import * as React from "react";
import { render } from "react-dom";

import { CalendarRange } from "./App";

const rootElement = document.getElementById("root");
render(
  <>
    <CalendarRange />
  </>,
  rootElement
);
