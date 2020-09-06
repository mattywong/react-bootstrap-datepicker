import * as React from "react";

import { renderToStaticMarkup } from "react-dom/server";

type Node = {
  el: Parameters<typeof React.createElement>[0];
  props?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  children: string;
};

type EditorDocument = Node[];

interface EditorState {
  document: EditorDocument[];
}

const INITIAL_DOCUMENT: EditorDocument = [
  {
    el: "h1",
    props: {
      style: {
        color: "red",
      },
    },
    children: "hello world",
  },
  {
    el: "h2",
    children: "hello world",
  },
];

const renderer = (node: Node) => {
  return React.createElement(node.el, node.props, node.children);
};

document.execCommand("DefaultParagraphSeparator", false, "p");

export const Editor = ({}) => {
  const [editorDocument, setEditorDocument] = React.useState(() => {
    return INITIAL_DOCUMENT;
  });

  const elRef = React.useRef<HTMLDivElement>(null);

  const initialChildren = React.useMemo(() => {
    return editorDocument.map((n, idx) => {
      return renderer({
        ...n,
        props: {
          ...n.props,
          key: idx,
        },
      });
    });
  }, []);

  const insertBlock = (node: Node): boolean => {
    const success = document.execCommand(
      "insertHTML",
      false,
      renderToStaticMarkup(renderer(node))
    );

    if (!success) {
      return success;
    }

    setEditorDocument((prev) => [...prev, node]);

    return success;
  };

  return (
    <section
      style={{
        border: "1px solid gray",
        borderRadius: "1rem",
        height: "1000px",
        display: "flex",
        flexDirection: "column",
      }}
      className="p-3"
    >
      <nav>
        <button
          type="button"
          onClick={(e) => {
            const block: Node = {
              el: "h1",
              props: {},
              children: "hello world 2",
            };

            const success = insertBlock(block);

            if (!success) {
              return;
            }
          }}
        >
          Add new block
        </button>
        <button
          type="button"
          onClick={(e) => {
            // document.execCommand("bold", false);

            const selection = window.getSelection();
            console.log(selection);
            // console.log(success);
          }}
        >
          Make bold
        </button>
      </nav>
      <div
        style={{
          marginTop: "auto",
          height: "100%",
          outline: 0,
          overflow: "auto",
        }}
        ref={elRef}
        contentEditable={true}
        suppressContentEditableWarning
        onKeyDown={React.useCallback(
          (e: React.KeyboardEvent<HTMLDivElement>) => {
            console.log(e);

            const { key } = e;

            switch (key) {
              case "Enter":
                console.log("enter pressed");
                // document.execCommand("formatBlock", false, "h1");

                // e.preventDefault();
                break;
              default:
                break;
            }
          },
          []
        )}
      >
        {initialChildren}
      </div>
      <footer></footer>
    </section>
  );
};
