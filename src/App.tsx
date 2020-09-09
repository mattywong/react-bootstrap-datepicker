import * as React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Editor } from "./components/Editor";
import { CalendarView } from "./views/CalendarView";

import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";

import { generateBaseLine } from "./util";

const rhythm = generateBaseLine({
  baseFontSize: 1, // 1rem. Browser default makes this 16px
  defaultLineHeight: 1.2, // unitless line-height, see: https://css-tricks.com/almanac/properties/l/line-height/#comment-1587658
  rhythmHeight: 0.75, // rem units. With browser default, this is 16px * 0.75rem == 12px
  capHeights: {
    // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
    Lato: 0.71,
  },
  debug: true,
});

const GlobalStyles = createGlobalStyle`
*, *:before, *:after  {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
}

// h1, p {
//   margin: 0;
//   padding: 0;
// }
${rhythm.global};
`;

export const App = ({}) => {
  return (
    <ThemeProvider theme={rhythm.theme as DefaultTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            <CalendarView />
          </Route>
          <Route path="/editor">
            <div
              css={`
                width: 720px;
                margin: 0 auto;
                display: flex;
              `}
            >
              <Editor />
            </div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
