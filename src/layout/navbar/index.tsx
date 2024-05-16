import React from 'react';
import AppLogo from '@/assets/app.custom-logo';
import { NavItem, NavItemGroup } from '@/components/pages/layout';
import SearchBar from '@/components/common/searchBar';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const search = (text: string) => {
    console.log('src_layout_navbar_index.tsx#8: ', text);
  };

  return (
    <div className='border-b-1 w-full border-t-3 border-t-gray-900 h-14'>
      <div className='container h-full flex items-center justify-between'>
        <NavItem fullHeight className='-ml-4 shrink-0'>
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
        <NavItemGroup className='shrink-0 gap-2'>
          <Button
            variant={'outline'}
            className='h-8 w-[70px] border-blue-600 text-blue-600 font-normal hover:text-blue-600 hover:bg-blue-100'
          >
            Log in
          </Button>
          <Button className='h-8 w-[70px] bg-blue-600 hover:bg-blue-700 font-normal'>Sign up</Button>
        </NavItemGroup>
      </div>
    </div>
  );
};

export default NavBar;
