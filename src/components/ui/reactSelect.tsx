import { I18nKeys } from '@/locales/i18nKeys';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { SingleValue, MultiValue, ActionMeta, StylesConfig } from 'react-select';

export interface IReactSelectOptions {
  label: string | ReactNode;
  value: string;
}

export interface IReactSelectProps {
  options: IReactSelectOptions[];
  value: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions> | undefined;
  onChange: (
    option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>,
    actionMeta: ActionMeta<IReactSelectOptions>
  ) => void;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isMulti?: true | undefined;
  className?: string;
  isInNavbar?: boolean;
  hideSeparator?: boolean;
  defaultValue?: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions> | undefined;
  menuPlacement?: 'auto' | 'top' | 'bottom';
  placeholder?: string;
  errorMsg?: string;
}

const navbarStyles: StylesConfig<IReactSelectOptions, true> = {
  control: (baseStyles) => ({
    ...baseStyles,
    borderRadius: 8,
    height: '34px',
    minHeight: '34px'
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    height: '34px'
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    height: '34px'
  })
};

const errorStyles: StylesConfig<IReactSelectOptions, true> = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: 0,
    boxShadow: 'none',
    outline: '1px solid red'
  })
};

const ReactSelect: React.FC<IReactSelectProps> = ({
  options,
  value,
  onChange,
  isSearchable = false,
  isClearable = false,
  isLoading = false,
  isMulti = undefined,
  className,
  isInNavbar = false,
  hideSeparator = false,
  defaultValue,
  menuPlacement,
  placeholder,
  errorMsg
}) => {
  const { t } = useTranslation();

  const defaultStyles: StylesConfig<IReactSelectOptions, true> = {
    option: (baseStyles) => ({
      ...baseStyles,
      cursor: 'pointer'
    }),
    ...(errorMsg && errorStyles),
    ...(isInNavbar && navbarStyles)
  };

  return (
    <Select
      className={className}
      styles={defaultStyles}
      options={options}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={isMulti}
      components={{
        ...(hideSeparator && { IndicatorSeparator: () => null })
      }}
      menuPlacement={menuPlacement}
      placeholder={placeholder}
      {...(isInNavbar && {
        menuPortalTarget: document.body,
        menuPosition: 'fixed' as const
      })}
      noOptionsMessage={() => t(I18nKeys.GLOBAL.NO_OPTIONS)}
    />
  );
};

export default ReactSelect;
