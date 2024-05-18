import React from 'react';
import AppLogo from '@/assets/app.custom-logo';
import SearchBar from '@/components/common/searchBar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import { Role } from '@/constants';
import { NavItem, NavItemGroup } from '@/components/pages/layout/navbarItems';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const search = (text: string) => {
    console.log('src_layout_navbar_index.tsx#8: ', text);
  };

  return (
    <div className='border-b-1 border-b-gray-300 border-t-3 border-t-gray-900 w-full h-14 bg-white fixed top-0 overflow-hidden'>
      <div className='container h-full flex items-center justify-between'>
        <NavItem fullHeight className='-ml-4 shrink-0' onClick={() => navigate(Path.HOME_CLIENT)}>
          <AppLogo />
        </NavItem>
        <NavItemGroup className='shrink-0'>
          <NavItem>
            <div>About</div>
          </NavItem>
          <NavItem>
            <div>Products</div>
          </NavItem>
          <NavItem>
            <div>Image scanning</div>
          </NavItem>
        </NavItemGroup>
        <SearchBar className='grow mx-4' onSubmit={search} />
        <UnlockAccess request={[Role.Guest]}>
          <NavItemGroup className='shrink-0 gap-2'>
            <Button
              variant={'outline'}
              className='h-8 w-[70px] border-blue-600 text-blue-600 font-normal hover:text-blue-600 hover:bg-blue-100'
              onClick={() => navigate(Path.LOGIN)}
            >
              Log in
            </Button>
            <Button
              className='h-8 w-[70px] bg-blue-600 hover:bg-blue-700 font-normal'
              onClick={() => navigate(Path.SIGN_UP)}
            >
              Sign up
            </Button>
          </NavItemGroup>
        </UnlockAccess>
      </div>
    </div>
  );
};

export default NavBar;
