import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutRequest } from '@/store/actions/auth';
import { useNavigate } from 'react-router-dom';
import AvatarFull from '@/components/common/avatarFull';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';

const AvatarDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus-visible:outline-none px-4 font-normal h-full flex items-center rounded-sm hover:bg-accent hover:text-accent-foreground'>
        <AvatarFull className='size-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-56'>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>Role: {user?.role.id}</DropdownMenuItem>
        <DropdownMenuItem disabled>Username: {user?.username}</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
