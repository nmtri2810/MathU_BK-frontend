import React from 'react';
import HelpLayout from '@/pages/help/helpLayout';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const HowToQuestion: React.FC = () => {
  const { t } = useTranslation();

  const passageList = [
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION1.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION1.P1)}</p>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION1.P2)}</p>
        </div>
      )
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION2.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION2.P1)}</p>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION2.P2)}</p>
        </div>
      )
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.P1)}</p>
          <ul className='list-disc pl-6'>
            <li>
              <span className='font-bold'>
                {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.UL1.LI1.B)}
              </span>{' '}
              {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.UL1.LI1.TEXT)}
            </li>
            <li>
              {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.UL1.LI2.TEXT1)}{' '}
              <span className='font-bold'>
                {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.UL1.LI2.B)}
              </span>
              {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.UL1.LI2.TEXT2)}
            </li>
          </ul>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.P2)}</p>
          <ul className='list-disc pl-6'>
            <li>
              <span className='font-bold'>
                {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.BAD_BOLD)}
              </span>{' '}
              {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.LI1)}
            </li>
            <li>
              <span className='font-bold'>
                {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.GOOD_BOLD)}
              </span>{' '}
              {t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION3.LI2)}
            </li>
          </ul>
        </div>
      )
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION4.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION4.P1)}</p>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION4.P2)}</p>
        </div>
      )
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION5.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION5.P)}</p>
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION6.TITLE),
      content: <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION6.P)}</p>
    },
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION7.TITLE),
      content: (
        <div className='space-y-4'>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION7.P1)}</p>
          <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.SECTION7.P2)}</p>
        </div>
      )
    }
  ];

  return (
    <HelpLayout heading={t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.TITLE)}>
      <p>{t(I18nKeys.HELP_CENTER.QUESTION.HOW_TO_GOOD_QUESTION.OPENING_P)}</p>
      {passageList.map((item, index) => (
        <div key={index}>
          <h2 className='mb-3 text-xl font-bold'>{item.heading}</h2>
          {item.content}
        </div>
      ))}
    </HelpLayout>
  );
};

export default HowToQuestion;
