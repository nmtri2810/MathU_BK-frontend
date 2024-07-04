import { Editor } from '@tiptap/react';
import React, { Fragment } from 'react';
import MenuItem from './toolItem';

interface IMenuBarProps {
  editor: Editor;
}

export interface IMenuItemProps {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
  disabled?: boolean;
}

interface IDividerProps {
  type: 'divider';
}

type MenuItemType = IMenuItemProps | IDividerProps;

const MenuBar: React.FC<IMenuBarProps> = ({ editor }) => {
  const items: MenuItemType[] = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    {
      icon: 'underline',
      title: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline')
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike')
    },
    // {
    //   icon: 'mark-pen-line',
    //   title: 'Highlight',
    //   action: () => editor.chain().focus().toggleHighlight().run(),
    //   isActive: () => editor.isActive('highlight')
    // },
    // {
    //   type: 'divider'
    // },
    // {
    //   icon: 'h-1',
    //   title: 'Heading 1',
    //   action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 1 })
    // },
    // {
    //   icon: 'h-2',
    //   title: 'Heading 2',
    //   action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 2 })
    // },
    // {
    //   icon: 'list-ordered',
    //   title: 'Ordered list',
    //   action: () => editor.chain().focus().toggleOrderedList().run(),
    //   isActive: () => editor.isActive('orderedList')
    // },
    // {
    //   icon: 'list-unordered',
    //   title: 'Bullet list',
    //   action: () => editor.chain().focus().toggleBulletList().run(),
    //   isActive: () => editor.isActive('bulletList')
    // },
    {
      type: 'divider'
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote')
    },
    {
      icon: 'separator',
      title: 'Horizontal rule',
      action: () => editor.chain().focus().setHorizontalRule().run()
    },
    // {
    //   icon: 'text-wrap',
    //   title: 'Hard break',
    //   action: () => editor.chain().focus().setHardBreak().run()
    // },
    {
      icon: 'format-clear',
      title: 'Clear format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run()
    },
    {
      type: 'divider'
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo()
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo()
    }
  ];

  const isDivider = (item: MenuItemType): item is IDividerProps => {
    return (item as IDividerProps).type === 'divider';
  };

  return (
    <div className='flex flex-wrap items-center gap-2 rounded-t-sm border-b-1 p-2'>
      {items.map((item, index) => (
        <Fragment key={index}>{isDivider(item) ? <div className='size-6' /> : <MenuItem {...item} />}</Fragment>
      ))}
    </div>
  );
};

export default MenuBar;
