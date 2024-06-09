import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

interface ISearchBarProps {
  className: string;
  onSubmit: (text: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({ className, onSubmit, placeholder }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>('');
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIconClick = () => {
    const inputElement = inputRef.current;

    if (inputElement && !isFocused) {
      inputElement.focus();
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;

    if (e.key === 'Enter' && inputElement) {
      inputElement.blur();
      onSubmit(textSearch);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const { top, left, width, height } = containerRef.current.getBoundingClientRect();
      setPortalStyle({
        top: top + height + 7,
        left,
        width
      });
    }
  }, [isFocused]);

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <div className='search-bar relative'>
        <Search
          className={cn(
            'absolute left-2 top-1/2 -translate-y-1/2 text-[#636b74] hover:cursor-text',
            isFocused && 'pointer-events-none'
          )}
          size={18}
          onClick={handleIconClick}
        />
        <Input
          type='text'
          placeholder={placeholder}
          className='h-8 select-none pl-8'
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
      {isFocused &&
        createPortal(
          <div
            className='fixed z-[1] rounded-md border bg-white p-3 shadow'
            style={portalStyle}
            onMouseDown={(e) => e.preventDefault()}
          >
            {/* content inside */}
            <div>hello</div>
            <Button onClick={() => console.log('src_components_common_searchBar.tsx#80: ')}>Helo</Button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SearchBar;
