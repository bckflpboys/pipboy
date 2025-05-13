import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ListBulletIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  LinkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ImageInsertModal from './ImageInsertModal';
import LinkModal from './LinkModal';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  if (!editor) {
    return null;
  }

  const handleImageInsert = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const handleLinkInsert = (url: string) => {
    if (!editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
              },
            },
          ],
        })
        .run();
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <>
      <div className="flex flex-wrap gap-1 p-2 bg-gray-900/50 border-b border-gray-800 rounded-t-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('bold') ? 'bg-gray-800' : ''
          }`}
        >
          <BoldIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('italic') ? 'bg-gray-800' : ''
          }`}
        >
          <ItalicIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-800' : ''
          }`}
        >
          <ChevronDoubleDownIcon className="w-5 h-5 transform rotate-180" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-800' : ''
          }`}
        >
          <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('bulletList') ? 'bg-gray-800' : ''
          }`}
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('blockquote') ? 'bg-gray-800' : ''
          }`}
        >
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-800 ${
            editor.isActive('codeBlock') ? 'bg-gray-800' : ''
          }`}
        >
          <CodeBracketIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <button
            onClick={() => setShowLinkModal(true)}
            className={`p-2 rounded-l hover:bg-gray-800 ${
              editor.isActive('link') ? 'bg-gray-800' : ''
            }`}
            title="Add link"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
          {editor.isActive('link') && (
            <button
              onClick={handleUnlink}
              className="p-2 rounded-r hover:bg-gray-800 border-l border-gray-700"
              title="Remove link"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <PhotoIcon className="w-5 h-5" />
        </button>
      </div>

      {showImageModal && (
        <ImageInsertModal
          onClose={() => setShowImageModal(false)}
          onInsert={handleImageInsert}
        />
      )}

      {showLinkModal && (
        <LinkModal
          onClose={() => setShowLinkModal(false)}
          onInsert={handleLinkInsert}
          initialUrl={editor.isActive('link') ? editor.getAttributes('link').href : ''}
        />
      )}
    </>
  );
};

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 hover:text-blue-300 transition-colors underline',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        validate: href => /^https?:\/\//.test(href), // Only allow URLs that start with http:// or https://
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="overflow-hidden border border-gray-800 rounded-lg bg-gray-900/50">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
}
