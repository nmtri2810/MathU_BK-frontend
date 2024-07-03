import React, { useEffect, useState } from 'react';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { getQuestionFilterOptions } from '@/constants';
import { useTranslation } from 'react-i18next';
import { MultiValue, SingleValue } from 'react-select';

const SortOption: React.FC = () => {
  const { t } = useTranslation();

  const [filterOption, setFilterOption] = useState<SingleValue<IReactSelectOptions>>();

  const onChangeFilter = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    setFilterOption(option as SingleValue<IReactSelectOptions>);
  };

  // Bad practice
  useEffect(() => {
    setFilterOption(getQuestionFilterOptions(t)[0]);
  }, [t]);

  return (
    <ReactSelect
      options={getQuestionFilterOptions(t)}
      defaultValue={getQuestionFilterOptions(t)[0]}
      value={filterOption}
      onChange={onChangeFilter}
      className='z-0 w-40 text-sm'
    />
  );
};

export default SortOption;
