import dynamic from "next/dynamic";
import { FC } from "react";
import { Editor, EditorState } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor: FC<{
  editorState: EditorState;
  handleEditorChange: (state: any) => void;
}> = ({ editorState, handleEditorChange }): JSX.Element => {
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="p-4 border-2 border-gray-200"
        editorClassName="bg-gray-100 p-4 border-2 border-gray-200"
        toolbarClassName="border-2 border-gray-200"
      />
    </div>
  );
};

export default TextEditor;
