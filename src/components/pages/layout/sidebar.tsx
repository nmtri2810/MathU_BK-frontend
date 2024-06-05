import React from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, CircleHelp, Home, Tags, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { NavLabel } from '@/constants';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const sidebarNav = [
    {
      label: t(NavLabel.HOME),
      link: Path.HOME_CLIENT,
      icon: <Home size={18} />
    },
    {
      label: t(NavLabel.QUESTIONS),
      link: Path.QUESTIONS,
      icon: <CircleHelp size={18} />
    },
    {
      label: t(NavLabel.TAGS),
      link: Path.TAGS,
      icon: <Tags size={18} />
    },
    {
      label: NavLabel.SPACER
    },
    {
      label: t(NavLabel.SAVES),
      link: Path.SAVES,
      icon: <Bookmark size={18} />
    },
    {
      label: t(NavLabel.USERS),
      link: Path.USERS,
      icon: <Users size={18} />
    }
  ];

  return (
    <div className='relative w-40 shrink-0 bg-white'>
      <div className='sticky top-14 h-[calc(100vh-56px)] w-auto overflow-y-auto py-6'>
        <nav className='navigation'>
          <ol>
            {sidebarNav.map((item, index) =>
              item.label !== NavLabel.SPACER ? (
                <li key={`${item.label}_${index}`}>
                  <NavLink
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
