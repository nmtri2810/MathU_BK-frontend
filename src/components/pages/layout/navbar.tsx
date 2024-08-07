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
import { I18nKeys } from '@/locales/i18nKeys';

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

  const handleChangeLanguage = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    const selected = option as SingleValue<IReactSelectOptions>;

    i18n.changeLanguage(selected?.value);
    localStorage.setItem('language', selected?.value as string);
    setSelectedOption(selected);
    window.location.reload();
  };

  return (
    <div className='fixed top-0 z-[1] h-14 w-full overflow-hidden border-b-1 border-t-3 border-b-gray-300 border-t-gray-900 bg-white'>
      <div className='container flex h-full items-center justify-between'>
        <NavItem fullHeight className='w-40 shrink-0' link={Path.HOME_CLIENT}>
          <AppLogo />
        </NavItem>

        <NavItemGroup className='shrink-0'>
          <NavItem link='/about'>{t(I18nKeys.HEADER.ABOUT)}</NavItem>
          <NavItem link={Path.HELP}>{t(I18nKeys.HEADER.HELP_CENTER)}</NavItem>
          <NavItem link='/image-scanning'>{t(I18nKeys.HEADER.IMAGE_SCANNING)}</NavItem>
        </NavItemGroup>

        <SearchBar className='mx-4 grow' />

        <UnlockAccess request={[Role.Guest]}>
          <NavItemGroup className='shrink-0 gap-2'>
            <Button
              variant='outline'
              className='h-fit min-h-8 w-fit border-blue-600 p-0 font-normal text-blue-600 hover:bg-blue-100 hover:text-blue-600'
            >
              <Link className='block px-4 py-1.5' to={Path.LOGIN}>
                {t(I18nKeys.HEADER.LOGIN)}
              </Link>
            </Button>
            <Button className='h-fit min-h-8 w-fit bg-blue-600 p-0 font-normal hover:bg-blue-700'>
              <Link className='block px-4 py-1.5' to={Path.SIGN_UP}>
                {t(I18nKeys.HEADER.SIGNUP)}
              </Link>
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
