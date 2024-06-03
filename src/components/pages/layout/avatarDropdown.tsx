import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutRequest } from '@/store/actions/auth';
import { useNavigate } from 'react-router-dom';
import AvatarFull from '@/components/common/avatarFull';
import { LogOut, Settings, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NavItem } from './navbarItems';
import { Button } from '@/components/ui/button';

const AvatarDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <Popover>
      <PopoverTrigger className='flex h-full items-center rounded-sm px-4 font-normal hover:bg-accent hover:text-accent-foreground focus-visible:outline-none'>
        <AvatarFull className='size-8' />
      </PopoverTrigger>
      <PopoverContent align='end' className='w-fit p-1'>
        <div className='flex items-center gap-2 px-3 py-2'>
          <AvatarFull className='size-9' />
          <div>
            <p className='text-sm font-semibold'>{user?.username}</p>
            <p className='text-sm text-gray-500'>{user?.email}</p>
          </div>
        </div>
        <div className='-mx-1 my-1 h-px bg-muted'></div>

        {/* temp */}
        {/* <p>Role: {user?.role.id}</p> */}

        <div className='text-sm'>
          <NavItem className='justify-start rounded-sm px-3 py-2' link=''>
            <User className='mr-2 size-4' />
            <span>Profile</span>
          </NavItem>
          <NavItem className='justify-start rounded-sm px-3 py-2' link=''>
            <Settings className='mr-2 size-4' />
            <span>Settings</span>
          </NavItem>
        </div>
        <div className='-mx-1 my-1 h-px bg-muted'></div>

        <Button variant='ghost' className='w-full justify-start rounded-sm px-3' onClick={handleLogout}>
          <LogOut className='mr-2 size-4' />
          <span>Log out</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarDropdown;
