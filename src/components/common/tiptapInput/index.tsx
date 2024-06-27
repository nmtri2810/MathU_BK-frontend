import React from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import Mathematics from '@tiptap-pro/extension-mathematics';
import Underline from '@tiptap/extension-underline';
import MenuBar from './toolBar';
import './editorContent.css';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

interface ITiptapInputProps {
  errorMsg?: string | undefined;
  value: string;
  onChange: (value: string) => void;
}

const TiptapInput: React.FC<ITiptapInputProps> = ({ errorMsg, value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      CharacterCount.configure({
        limit: 10000
      }),
      Mathematics,
      Underline
    ],
    content: value,
    onUpdate({ editor }) {
      if (editor.state.doc.textContent.length === 0) {
        onChange('');
        return;
      }

      onChange(editor.getHTML());
    }
  }) as Editor;

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'tiptap-input max-h-96 rounded-md border bg-white text-[#0d0d0d] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        errorMsg ? 'border-destructive focus-within:ring-red-100' : ''
      )}
    >
      <MenuBar editor={editor} />
      <EditorContent className='editor-content max-h-44 flex-auto overflow-y-auto overflow-x-hidden' editor={editor} />
    </div>
  );
};

export default TiptapInput;
