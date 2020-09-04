import * as React from 'react';
import { render } from 'react-dom';

import { DatePicker } from './DatePicker';

const rootElement = document.getElementById('root');
render(
  <div>
    <DatePicker months={2} />
  </div>,
  rootElement,
);
