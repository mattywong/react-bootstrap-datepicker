import { Interval } from "date-fns";

export type Modifiers = Partial<Interval>;

export type KeyValue = {
  value: number;
  label: string;
};
