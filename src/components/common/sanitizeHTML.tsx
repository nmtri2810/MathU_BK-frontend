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
  innerText?: boolean;
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
const sanitize = (
  dirty: string | Node,
  options: DOMPurify.Config & { RETURN_TRUSTED_TYPE: true },
  innerText?: boolean
) => {
  if (!dirty) return { __html: '' };

  // check if tag is string or html tag
  let dirtyHTML = typeof dirty === 'string' ? dirty : (dirty as HTMLElement).innerHTML;
  dirtyHTML = renderMath(dirtyHTML);

  const sanitizedHTML = DOMPurify.sanitize(dirtyHTML, { ...defaultOptions, ...options });

  if (innerText) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = String(sanitizedHTML);
    return { __html: tempDiv.textContent || tempDiv.innerText || '' };
  } else {
    return { __html: sanitizedHTML };
  }
};

const SanitizeHTML: React.FC<ISanitizeHTMLProps> = ({
  html,
  options = { RETURN_TRUSTED_TYPE: true },
  className,
  innerText
}) => {
  const sanitizedHtml = React.useMemo(() => sanitize(html, options, innerText), [html, options, innerText]);

  return (
    <div id='question-body' className={cn('space-y-4 break-all', className)} dangerouslySetInnerHTML={sanitizedHtml} />
  );
};

export default SanitizeHTML;
