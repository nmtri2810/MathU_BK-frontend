import React from 'react';
import HelpLayout from '@/pages/help/helpLayout';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const WriteMathFormula: React.FC = () => {
  const { t } = useTranslation();

  const passageList = [
    {
      heading: 'Temp',
      content: <p>Temp</p>
    }
  ];

  return (
    <HelpLayout heading={t(I18nKeys.HELP_CENTER.LATEX.HOW_TO_USE_LATEX.TITLE)}>
      <p>Temp</p>
      {passageList.map((item, index) => (
        <div key={index}>
          <h2 className='mb-3 text-xl font-bold'>{item.heading}</h2>
          {item.content}
        </div>
      ))}
    </HelpLayout>
  );
};

export default WriteMathFormula;
