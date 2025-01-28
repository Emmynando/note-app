"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Blockquote from "@tiptap/extension-blockquote";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnderline,
} from "react-icons/ai";
import { PiParagraph, PiCodeBlock } from "react-icons/pi";
import { BsBlockquoteLeft } from "react-icons/bs";
import { FaListOl, FaList } from "react-icons/fa6";

const TextEditor = ({ taskbody, setTaskBody }) => {
  const editor = useEditor({
    extensions: [
      // Paragraph,
      // Blockquote,
      Document,
      StarterKit,
      Underline,

      Link.configure({
        openOnClick: true, // Links open in a new tab
        autolink: true, // Automatically convert URLs to links
      }),
      Placeholder.configure({
        placeholder: "Write here...",
      }),
    ],
    content: taskbody,
    onUpdate: ({ editor }) => {
      // Send the latest content to the parent component
      setTaskBody(editor.getHTML());
    },
  });

  if (!editor) return <div>Loading editor...</div>;
  return (
    <div className="button-group border border-secFade h-[18rem] rounded-md p-2">
      <div className="flex items-center gap-2 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className="border-l border-secFade pl-2">
          <AiOutlineBold />
        </button>

        <button
          onClick={() => editor.chain().focus().setBold().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}>
          <AiOutlineUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}>
          <AiOutlineItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph()}
          disabled={!editor.can().chain().focus().setParagraph().run()}>
          <PiParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          className="border-r pr-2 border-secFade">
          <PiCodeBlock />
        </button>
        <button
          onClick={() => editor.chain().focus().setBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}>
          <BsBlockquoteLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}>
          <FaList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}>
          <FaListOl />
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: "https://example.com" })
              .run()
          }>
          <AiOutlineLink />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="h-68 max-h-75 overflow-scroll scrollbar-none"
        style={{
          height: "15rem",
          maxHeight: "17rem",
          caretColor: "white",
        }}
      />
    </div>
  );
};

export default TextEditor;
