import React from 'react';
import HelpLayout from '@/pages/help/helpLayout';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const HowToAnswer: React.FC = () => {
  const { t } = useTranslation();

  const passageList = [
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION1.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION1.P)}</p>
    },
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION2.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION2.P)}</p>
    },
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION3.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION3.P)}</p>
    },
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.P1)}</p>
          <ul className='list-disc pl-6'>
            <li>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.LI1)}</li>
            <li>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.LI2)}</li>
            <li>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.LI3)}</li>
            <li>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.LI4)}</li>
          </ul>
          <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION4.P2)}</p>
        </div>
      )
    },
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION5.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.SECTION5.P)}</p>
    }
  ];

  return (
    <HelpLayout heading={t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.TITLE)}>
      <p>{t(I18nKeys.HELP_CENTER.ANSWER.HOW_TO_GOOD_ANSWER.OPENING_P)}</p>
      {passageList.map((item, index) => (
        <div key={index}>
          <h2 className='mb-3 text-xl font-bold'>{item.heading}</h2>
          {item.content}
        </div>
      ))}
    </HelpLayout>
  );
};

export default HowToAnswer;
