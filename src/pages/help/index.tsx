import { Path } from '@/constants/enum';
import Layout from '@/layout/mainLayout';
import { I18nKeys } from '@/locales/i18nKeys';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

const HelpScreen: React.FC = () => {
  const { t } = useTranslation();

  const gridData = [
    {
      heading: t(I18nKeys.HELP_CENTER.QUESTION.HEADING),
      links: [{ to: Path.HOW_TO_QUESTION, text: t(I18nKeys.RIGHT_SIDEBAR.GOOD_QUES_CONTENT) }]
    },
    {
      heading: t(I18nKeys.HELP_CENTER.ANSWER.HEADING),
      links: [{ to: Path.HOW_TO_ANSWER, text: t(I18nKeys.RIGHT_SIDEBAR.GOOD_ANS_CONTENT) }]
    },
    {
      heading: t(I18nKeys.HELP_CENTER.KATEX.HEADING),
      links: [{ to: Path.WRITE_MATH_FORMULA, text: t(I18nKeys.RIGHT_SIDEBAR.KATEX_CONTENT) }]
    }
  ];

  return (
    <Layout containerClassname='min-h-[calc(100vh-56px)]' showLeftSidebar={false} showRightSidebar={false}>
      <div className='p-6'>
        <h1 className='mb-8 border-b-1 pb-4 text-2xl font-bold'>{t(I18nKeys.HELP_CENTER.HEADING)}</h1>
        <div className='grid grid-cols-3 gap-3'>
          {gridData.map((item, index) => (
            <div key={index}>
              <div className='mb-4 text-lg font-semibold'>{item.heading}</div>
              <div className='space-y-2'>
                {item.links.map((link, index) => (
                  <Link key={index} className='block w-fit hover:underline' to={link.to}>
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </Layout>
  );
};

export default HelpScreen;
