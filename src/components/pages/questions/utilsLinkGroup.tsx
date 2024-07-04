import { Button } from '@/components/ui/button';
import { I18nKeys } from '@/locales/i18nKeys';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UtilsLinkGroup: React.FC = () => {
  const { t } = useTranslation();

  const utilsData = [
    { text: t(I18nKeys.GLOBAL.SHARE) },
    { text: t(I18nKeys.GLOBAL.EDIT) },
    { text: t(I18nKeys.GLOBAL.FOLLOW) }
  ];

  return (
    <div className='space-x-3 text-sm'>
      {utilsData.map((data, index) => (
        <Button key={index} variant='link' className='mt-4 h-fit p-0 font-normal'>
          {data.text}
        </Button>
      ))}
    </div>
  );
};

export default UtilsLinkGroup;
