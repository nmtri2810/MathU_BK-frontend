import React, { useState } from 'react';
import AppLogo from '@/assets/app.custom-logo';
import SearchBar from '@/components/common/searchBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import { AppLanguages, Role } from '@/constants';
import { NavItem, NavItemGroup } from '@/components/pages/layout/navbarItems';
import AvatarDropdown from '@/components/pages/layout/avatarDropdown';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { MultiValue, SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import VietnameseLogo from '@/assets/vietnamese.logo';
import EnglishLogo from '@/assets/english.logo';

// save language in local storage
const LanguageOptions = [
  { label: <VietnameseLogo size={20} />, value: AppLanguages.VIETNAMESE },
  { label: <EnglishLogo size={20} />, value: AppLanguages.ENGLISH }
];

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<SingleValue<IReactSelectOptions>>(() => {
    return LanguageOptions.find((option) => option.value === localStorage.getItem('language')) || LanguageOptions[0];
  });

  const search = (text: string) => {
    console.log('src_layout_navbar_index.tsx#8: ', text);
  };

  const handleChangeLanguage = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    const selected = option as SingleValue<IReactSelectOptions>;
    i18n.changeLanguage(selected?.value);
    localStorage.setItem('language', selected?.value as string);
    setSelectedOption(option as SingleValue<IReactSelectOptions>);
  };

  return (
    <div className='fixed top-0 z-[1] h-14 w-full overflow-hidden border-b-1 border-t-3 border-b-gray-300 border-t-gray-900 bg-white'>
      <div className='container flex h-full items-center justify-between'>
        <NavItem fullHeight className='w-40 shrink-0' link={Path.HOME_CLIENT}>
          <AppLogo />
        </NavItem>

        <NavItemGroup className='shrink-0'>
          <NavItem link='/about'>{t('header.about')}</NavItem>
          <NavItem link='/help-center'>{t('header.help-center')}</NavItem>
          <NavItem link='/image-scanning'>{t('header.image-scanning')}</NavItem>
        </NavItemGroup>

        <SearchBar className='mx-4 grow' onSubmit={search} placeholder={t('header.search')} />

        <UnlockAccess request={[Role.Guest]}>
          <NavItemGroup className='shrink-0 gap-2'>
            <Button
              variant='outline'
              className='h-8 w-fit border-blue-600 font-normal text-blue-600 hover:bg-blue-100 hover:text-blue-600'
            >
              <Link to={Path.LOGIN}>{t('header.log-in')}</Link>
            </Button>
            <Button className='h-8 w-fit bg-blue-600 font-normal hover:bg-blue-700'>
              <Link to={Path.SIGN_UP}>{t('header.sign-up')}</Link>
            </Button>
          </NavItemGroup>
        </UnlockAccess>

        <UnlockAccess request={[Role.Moderator, Role.User]}>
          <AvatarDropdown />
        </UnlockAccess>

        <ReactSelect
          options={LanguageOptions}
          value={selectedOption}
          onChange={handleChangeLanguage}
          className='ml-2 w-fit shrink-0 text-sm'
          isInNavbar={true}
          hideSeparator={true}
        />
      </div>
    </div>
  );
};

export default NavBar;
