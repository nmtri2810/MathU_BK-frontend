import React from 'react';
import DOMPurify from 'dompurify';
import './tiptapInput/editorContent.css';
import katex from 'katex';
import { MathTags } from '@/constants';
import { cn } from '@/lib/utils';

interface ISanitizeHTMLProps {
  html: string | Node;
  options?: DOMPurify.Config & { RETURN_TRUSTED_TYPE: true };
  className?: string;
}

const defaultOptions: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'p',
    'strong',
    'em',
    'u',
    's',
    'mark',
    'h1',
    'h2',
    'ol',
    'ul',
    'li',
    'blockquote',
    'hr',
    'span',
    ...MathTags
  ]
};

// Function to render LaTeX expressions within HTML
const renderMath = (html: string): string => {
  return html.replace(/\$(.+?)\$/g, (match, tex) => {
    try {
      return katex.renderToString(tex, {
        throwOnError: false
      });
    } catch (e) {
      return match;
    }
  });
};

// Function to sanitize HTML content
const sanitize = (dirty: string | Node, options: DOMPurify.Config & { RETURN_TRUSTED_TYPE: true }) => {
  if (!dirty) return { __html: '' };

  // check if tag is string or html tag
  let dirtyHTML = typeof dirty === 'string' ? dirty : (dirty as HTMLElement).innerHTML;
  dirtyHTML = renderMath(dirtyHTML);

  return {
    __html: DOMPurify.sanitize(dirtyHTML, { ...defaultOptions, ...options })
  };
};

const SanitizeHTML: React.FC<ISanitizeHTMLProps> = ({ html, options = { RETURN_TRUSTED_TYPE: true }, className }) => {
  const sanitizedHtml = React.useMemo(() => sanitize(html, options), [html, options]);

  return <div id='question-body' className={cn('space-y-4', className)} dangerouslySetInnerHTML={sanitizedHtml} />;
};

export default SanitizeHTML;
