import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, CircleHelp, Home, Tags, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { NavLabel } from '@/constants';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateParams } from '@/store/actions/question';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { perPage } = useAppSelector((state) => state.question.meta);

  const sidebarNav = [
    {
      label: t(I18nKeys.GLOBAL.HOME),
      link: Path.HOME_CLIENT,
      icon: <Home size={18} />
    },
    {
      label: t(I18nKeys.GLOBAL.QUESTIONS),
      link: Path.QUESTIONS,
      icon: <CircleHelp size={18} />,
      onClick: () => {
        dispatch(updateParams({ page: 1, perPage: perPage, keyword: '' }));
      }
    },
    {
      label: t(I18nKeys.GLOBAL.TAGS),
      link: Path.TAGS,
      icon: <Tags size={18} />
    },
    {
      label: NavLabel.SPACER
    },
    {
      label: t(I18nKeys.GLOBAL.SAVES),
      link: Path.SAVES,
      icon: <Bookmark size={18} />
    },
    {
      label: t(I18nKeys.GLOBAL.USERS),
      link: Path.USERS,
      icon: <Users size={18} />
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className='relative w-40 shrink-0 bg-white'>
      <div className='sticky top-14 h-[calc(100vh-56px)] w-auto overflow-y-auto py-6'>
        <nav className='navigation'>
          <ol>
            {sidebarNav.map((item, index) =>
              item.label !== NavLabel.SPACER ? (
                <li key={`${item.label}_${index}`}>
                  <NavLink
                    onClick={item.onClick ? () => item.onClick() : undefined}
                    to={item.link || ''}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-9 items-center justify-start gap-2 rounded-bl-lg rounded-tl-lg p-2 text-sm',
                        isActive
                          ? 'bg-[#f1f2f3] font-bold text-gray-900'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ) : (
                <li key={`${item.label}_${index}`} className='min-h-9'></li>
              )
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
