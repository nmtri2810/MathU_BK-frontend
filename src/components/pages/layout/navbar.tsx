import React from 'react';
import AppLogo from '@/assets/app.custom-logo';
import SearchBar from '@/components/common/searchBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import { Role } from '@/constants';
import { NavItem, NavItemGroup } from '@/components/pages/layout/navbarItems';
import AvatarDropdown from '@/components/pages/layout/avatarDropdown';

const NavBar: React.FC = () => {
  const search = (text: string) => {
    console.log('src_layout_navbar_index.tsx#8: ', text);
  };

  return (
    <div className='fixed top-0 h-14 w-full overflow-hidden border-b-1 border-t-3 border-b-gray-300 border-t-gray-900 bg-white'>
      <div className='container flex h-full items-center justify-between'>
        <NavItem fullHeight className='w-40 shrink-0' link={Path.HOME_CLIENT}>
          <AppLogo />
        </NavItem>

        <NavItemGroup className='shrink-0'>
          <NavItem link='/about'>About</NavItem>
          <NavItem link='/products'>Products</NavItem>
          <NavItem link='/image-scanning'>Image scanning</NavItem>
        </NavItemGroup>

        <SearchBar className='mx-4 grow' onSubmit={search} />

        <UnlockAccess request={[Role.Guest]}>
          <NavItemGroup className='shrink-0 gap-2'>
            <Button
              variant='outline'
              className='h-8 w-[70px] border-blue-600 font-normal text-blue-600 hover:bg-blue-100 hover:text-blue-600'
            >
              <Link to={Path.LOGIN}>Log in</Link>
            </Button>
            <Button className='h-8 w-[70px] bg-blue-600 font-normal hover:bg-blue-700'>
              <Link to={Path.SIGN_UP}>Sign up</Link>
            </Button>
          </NavItemGroup>
        </UnlockAccess>

        <UnlockAccess request={[Role.Moderator, Role.User]}>
          <AvatarDropdown />
        </UnlockAccess>
      </div>
    </div>
  );
};

export default NavBar;
