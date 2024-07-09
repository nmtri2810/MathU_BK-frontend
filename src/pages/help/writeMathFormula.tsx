import React from 'react';
import HelpLayout from '@/pages/help/helpLayout';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { Link } from 'react-router-dom';

// Temp only vietnamese
const WriteMathFormula: React.FC = () => {
  const { t } = useTranslation();

  const passageList = [
    {
      heading: 'Cách sử dụng',
      content: (
        <div className='space-y-4'>
          <p>
            Trang web chỉ hỗ trợ sử dụng <span className='font-bold'>$...$</span> để viết công thức toán học trong một
            dòng văn bản:
          </p>
          <ul className='mt-3 list-disc space-y-3 pl-6'>
            <li>
              <span className='font-bold'>$E = mc^2$</span> -&gt; Kết quả sẽ hiển thị là{' '}
              <SanitizeHTML className='inline-block' html={'$E = mc^2$'} />
            </li>
            <li>
              <span className='font-bold'>{`$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$`}</span> -&gt; Kết quả sẽ hiển thị là{' '}
              <SanitizeHTML className='inline-block' html={'$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$'} />
            </li>
          </ul>
          <p>
            Hiện tại trang web chỉ hỗ trợ viết công thức toán học trên một dòng, vậy nên với những công thức cần xuống
            dòng, hãy cho tất cả công thức lên một dòng, bạn sẽ đạt được kết quả mong muốn:
          </p>
          <ul className='mt-3 list-disc space-y-3 pl-6'>
            <li>
              <span className='font-bold'>{`$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$`}</span> -&gt; Kết quả sẽ
              hiển thị là{' '}
              <SanitizeHTML className='inline-block' html={'$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$'} />
            </li>
            <li>
              <span className='font-bold'>{`$\\begin{cases} a &\\text{if } b \\\\ c &\\text{if } d \\end{cases}$`}</span>{' '}
              -&gt; Kết quả sẽ hiển thị là{' '}
              <SanitizeHTML
                className='inline-block'
                html={'$\\begin{cases} a &\\text{if } b \\\\ c &\\text{if } d \\end{cases}$'}
              />
            </li>
          </ul>
          <p>
            Nếu bạn gặp khó khăn khi muốn thể hiện công thức toán học mong muốn, đừng ngần ngại sử dụng{' '}
            <span className='font-bold'>ChatGPT/AI</span> để hỗ trợ trong việc viết công thức cho bạn.
          </p>
        </div>
      )
    },
    {
      heading: 'Một số tài liệu tham khảo',
      content: (
        <div className='space-y-4'>
          <p>Dưới đây là một số tài liệu tham khảo giúp hỗ trợ bạn tìm công thức mình mong muốn:</p>
          <ul className='mt-3 list-disc space-y-3 pl-6'>
            <li>
              <Link
                to='https://katex.org/docs/supported.html'
                target='_blank'
                className='block w-fit text-blue-600 hover:text-blue-700 hover:underline'
              >
                Những chức năng được hỗ trợ trong LaTeX
              </Link>
            </li>
            <li>
              <Link
                to='https://katex.org/docs/support_table'
                target='_blank'
                className='block w-fit text-blue-600 hover:text-blue-700 hover:underline'
              >
                Bảng chức năng hỗ trợ trong LaTeX, sắp xếp theo bảng chữ cái
              </Link>
            </li>
            <li>
              <Link
                to='https://www.mathvn.com/2021/09/latex-co-ban-cach-go-cac-cong-thuc-ki.html'
                target='_blank'
                className='block w-fit text-blue-600 hover:text-blue-700 hover:underline'
              >
                LaTeX cơ bản
              </Link>
            </li>
            <li>
              <Link
                to='https://viblo.asia/p/su-dung-latex-soan-thao-cong-thuc-toan-hoc-amoG84a6Gz8P'
                target='_blank'
                className='block w-fit text-blue-600 hover:text-blue-700 hover:underline'
              >
                Sử dụng LaTeX soạn thảo công thức toán học
              </Link>
            </li>
          </ul>
          <p className='font-bold'>Chúc bạn sử dụng và học tập tốt trên trang web!</p>
        </div>
      )
    }
  ];

  return (
    <HelpLayout heading={t(I18nKeys.HELP_CENTER.KATEX.HOW_TO_USE_KATEX.TITLE)}>
      <p>
        <span className='font-bold'>KaTeX</span> là một thư viện mã nguồn mở được dùng để hiển thị các công thức toán
        học viết bằng cú pháp <span className='font-bold'>LaTeX</span> trên các trang web.{' '}
        <span className='font-bold'>LaTeX</span> là một hệ thống soạn thảo văn bản được sử dụng rộng rãi trong các lĩnh
        vực học thuật, đặc biệt là toán học, khoa học, kỹ thuật và tin học. <span className='font-bold'>LaTeX</span> nổi
        bật nhờ khả năng xử lý các công thức toán học phức tạp, tự động hóa việc định dạng văn bản, và hỗ trợ nhiều ngôn
        ngữ và ký hiệu khoa học khác nhau.
      </p>
      <p></p>
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
