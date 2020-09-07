import * as React from "react";

import { renderToStaticMarkup } from "react-dom/server";

import {
  createEditor,
  Node,
  Transforms,
  Text,
  Editor as SlateEditor,
  Range,
} from "slate";

import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import { withHistory } from "slate-history";

import { withMdShortcuts } from "./withMdShortcuts";

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const CustomEditor = {
  isBoldMarkActive(editor: ReactEditor) {
    const [match] = SlateEditor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    console.log(match);

    return !!match;
  },

  isCodeBlockActive(editor: ReactEditor) {
    const [match] = SlateEditor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: ReactEditor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: ReactEditor) {
    editor;
    const isActive = CustomEditor.isCodeBlockActive(editor);

    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => SlateEditor.isBlock(editor, n) }
    );
  },
};

export const Editor = ({}) => {
  const [value, setValue] = React.useState<Node[]>(() => {
    return localStorage.getItem("content")
      ? JSON.parse(localStorage.getItem("content") as string)
      : [
          {
            type: "p",
            children: [{ text: "A line of text in a paragraph." }],
          },
        ];
  });

  const [tagSearch, setTagSearch] = React.useState("");

  const [tags, setTags] = React.useState(() => {
    return [];
  });

  const editor = React.useMemo(() => {
    const _editor = withReact(withMdShortcuts(withHistory(createEditor())));

    const { isInline } = _editor;
    _editor.isInline = (element) => {
      switch (element.type) {
        case "hashtag":
          return true;
      }

      return isInline(element);
    };

    return _editor;
  }, []);

  const renderElement = React.useCallback((props) => {
    switch (props.element.type) {
      case "p":
        return <p {...props} />;
      case "h1":
        return <h1 {...props} />;
      case "h2":
        return <h2 {...props} />;
      case "h3":
        return <h3 {...props} />;
      case "h4":
        return <h4 {...props} />;
      case "h5":
        return <h5 {...props} />;
      case "h6":
        return <h6 {...props} />;
      case "ul":
        return <ul {...props} />;
      case "li":
        return <li {...props} />;
      case "blockquote":
        return (
          <blockquote
            style={{ borderLeft: "3px solid gray", paddingLeft: "1rem" }}
            {...props}
          />
        );
      case "hashtag":
        return (
          <span
            style={{
              backgroundColor: "red",
            }}
            {...props}
          />
        );
      default:
        return <div {...props} />;
    }
  }, []);

  const renderLeaf = React.useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const elRef = React.useRef<HTMLDivElement>(null);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        const content = JSON.stringify(value);
        localStorage.setItem("content", content);
      }}
    >
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
        <nav className="mb-3">
          <button
            onClick={(e) => {
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            Bold
          </button>
        </nav>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            marginTop: "auto",
            height: "100%",
            outline: 0,
            overflow: "auto",
          }}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case "`": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }

              case "b": {
                console.log("BOLD");
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
            }
          }}
        />
        <footer></footer>
      </section>
    </Slate>
  );
};
