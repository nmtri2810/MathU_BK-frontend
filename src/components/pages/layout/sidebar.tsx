import React from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, CircleHelp, Home, Tags, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const sidebarNav = [
    {
      label: 'Home',
      link: '#',
      icon: <Home size={18} />
    },
    {
      label: 'Questions',
      link: '#',
      icon: <CircleHelp size={18} />
    },
    {
      label: 'Tags',
      link: '#',
      icon: <Tags size={18} />
    },
    {
      label: '',
      link: '',
      icon: ''
    },
    {
      label: 'Saves',
      link: '#',
      icon: <Bookmark size={18} />
    },
    {
      label: 'Users',
      link: '#',
      icon: <Users size={18} />
    }
  ];

  return (
    <div className='relative w-40 shrink-0 bg-white'>
      <div className='sticky top-14 h-[calc(100vh-56px)] w-auto overflow-y-auto py-6'>
        <nav className='navigation'>
          <ol>
            {sidebarNav.map((item, index) => (
              <li key={`${item.label}_${index}`}>
                <Link
                  to={item.link}
                  className={cn(
                    'flex min-h-9 items-center justify-start gap-2 rounded-bl-lg rounded-tl-lg p-2 text-sm',
                    !item.label && 'pointer-events-none',
                    item.label === 'Home'
                      ? 'bg-[#f1f2f3] font-bold text-gray-900'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
