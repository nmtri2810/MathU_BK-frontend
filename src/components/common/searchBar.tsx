import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import AskQuestionBtn from '@/components/pages/questions/askQuestionBtn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Path } from '@/constants/enum';
import { updateParams } from '@/store/actions/question';
import { I18nKeys } from '@/locales/i18nKeys';
import { useTranslation } from 'react-i18next';

interface ISearchBarProps {
  className: string;
}

// need to refactor this to reuse
const SearchBar: React.FC<ISearchBarProps> = ({ className }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const searchKeyword = useAppSelector((state) => state.question.keyword);
  const paginationData = useAppSelector((state) => state.question.meta);
  const { perPage } = paginationData;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>('');
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchHelpList = [
    { help: '[tag]:toán cao cấp', explain: 'search within a tag' },
    { help: '[user]:abcd1234', explain: 'search for question creator' },
    // { help: '[score]:3', explain: 'question with a 3+ score' }, // temp
    { help: '[isaccepted]:yes', explain: 'search within status' }
  ];

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
      search(textSearch);
    }
  };

  const search = (text: string) => {
    dispatch(updateParams({ page: 1, perPage: perPage, keyword: text }));
    navigate(Path.QUESTIONS);
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

  useEffect(() => {
    if (searchKeyword && location.pathname === Path.QUESTIONS) {
      setTextSearch(searchKeyword);
    } else {
      setTextSearch('');
      dispatch(updateParams({ page: 1, perPage: perPage, keyword: '' }));
    }
  }, [dispatch, location.pathname, perPage, searchKeyword]);

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
          placeholder={t(I18nKeys.HEADER.SEARCH_PLACEHOLDER)}
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
            <div className='mb-2 text-lg font-bold'>Advance search</div>
            <div className='mb-3 grid grid-cols-2 gap-3 border-b-1 pb-3 text-sm'>
              {searchHelpList.map((item, index) => (
                <div key={index}>
                  <span className='font-semibold'>{item.help}</span>{' '}
                  <span className='text-gray-500'>{item.explain}</span>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-between'>
              <AskQuestionBtn size='sm' />
              <Link className='text-sm text-blue-600 hover:text-blue-700 hover:underline' to='#'>
                Search help
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SearchBar;
