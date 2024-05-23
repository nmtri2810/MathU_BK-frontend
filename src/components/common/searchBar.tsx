import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ISearchBarProps {
  className: string;
  onSubmit: (text: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ className, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textSearch, setTextSearch] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={cn('relative', className)}>
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
          placeholder='Search...'
          className='h-8 select-none pl-8'
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
      {isFocused && (
        <div
          className={cn('absolute top-[42px] w-full select-text rounded-md border p-3 shadow')}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div>hello</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
