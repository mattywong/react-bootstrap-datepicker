import * as React from "react";
import * as store from "store2";
import { CalendarDateRange } from "./components/CalendarDateRange";

interface Note {
  id: string;
  data: string;
  createdDate: Date;
  modifiedDate: Date;
}

interface State {
  notes: Note[];
  startDate?: Date;
  endDate?: Date;
}

type Actions =
  | {
      type: "notes/add";
      payload: Note;
    }
  | {
      type: "notes/edit";
      id: string;
      payload: Partial<Note>;
    };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "notes/add": {
      const newState = {
        ...state,
        notes: [...state.notes, action.payload],
      };

      store.set("notes", newState);
      return newState;
    }
    case "notes/edit": {
      const note = state.notes.find((n) => n.id === action.id);

      if (note === undefined) {
        return state;
      }

      const idx = state.notes.indexOf(note);

      const newNote = {
        ...note,
        ...action.payload,
      };

      const newNotes = [...state.notes];
      newNotes[idx] = newNote;

      const newState = {
        ...state,
        notes: newNotes,
      };

      store.set("notes", newState);

      return newState;
    }
    default:
      return state;
  }
};

export const App = ({}) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    {
      notes: [],
      startDate: undefined,
      endDate: undefined,
    },
    (initial) => {
      return {
        ...initial,
        ...store.get("notes"),
      };
    }
  );

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-4">
          <CalendarDateRange
            startDate={state.startDate}
            endDate={state.endDate}
            // months={1}
          />
        </div>
        <div className="col-8">
          {state.notes?.map((note, idx) => (
            <textarea
              key={note.id}
              className="form-control"
              onChange={(e) => {
                const { value } = e.target;

                dispatch({
                  type: "notes/edit",
                  id: note.id,
                  payload: {
                    data: value,
                  },
                });
              }}
              value={note.data}
            />
          ))}

          <button
            className="btn btn-outline-success"
            type="button"
            onClick={(e) => {
              dispatch({
                type: "notes/add",
                payload: {
                  id: Math.floor(Math.random() * 99999999) + "",
                  createdDate: new Date(),
                  modifiedDate: new Date(),
                  data: "",
                },
              });
            }}
          >
            Add note
          </button>
        </div>
      </div>
    </div>
  );
};
