import { Pagination } from '@nextui-org/pagination';
import React from 'react';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { MultiValue, SingleValue } from 'react-select';
import { PerpageOptions } from '@/constants';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

interface IFullPaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (value: number) => void;
  perpageValue: SingleValue<IReactSelectOptions> | undefined;
  onChangePerpage: (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => void;
}

const FullPagination: React.FC<IFullPaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage,
  perpageValue,
  onChangePerpage
}) => {
  const { t } = useTranslation();

  return (
    <div className='mt-6 flex items-center justify-between'>
      <Pagination
        page={currentPage}
        total={totalPages}
        onChange={onChangePage}
        initialPage={1}
        showControls
        showShadow
      />
      <div className='flex items-center gap-2'>
        <ReactSelect
          options={PerpageOptions}
          defaultValue={PerpageOptions[0]}
          value={perpageValue}
          onChange={onChangePerpage}
          className='z-0 w-fit text-sm'
          menuPlacement='top'
        />
        <span>{t(I18nKeys.GLOBAL.PERPAGE)}</span>
      </div>
    </div>
  );
};

export default FullPagination;
