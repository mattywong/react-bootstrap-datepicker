import { Element } from "slate";
import { ReactEditor } from "slate-react";
export const withParagraphs = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    console.log(node);

    // If the element is a paragraph, ensure its children are valid.
    if (Element.isElement(node) && node.type === "paragraph") {
      // for (const [child, childPath] of Node.children(editor, path)) {
      //   if (Element.isElement(child) && !editor.isInline(child)) {
      //     Transforms.unwrapNodes(editor, { at: childPath });
      //     return;
      //   }
      // }
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode(entry);
  };

  return editor;
};
