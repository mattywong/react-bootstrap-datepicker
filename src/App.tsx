import * as React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Editor } from "./components/Editor";
import { CalendarView } from "./views/CalendarView";

export const App = ({}) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <CalendarView />
        </Route>
        <Route path="/editor">
          <div className="container">
            <Editor />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
