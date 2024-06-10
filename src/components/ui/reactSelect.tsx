import React, { ReactNode } from 'react';
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
}

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
  menuPlacement
}) => {
  const customStyles: StylesConfig<IReactSelectOptions, true> = isInNavbar
    ? {
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
      }
    : {};

  const menuProps = isInNavbar
    ? {
        menuPortalTarget: document.body,
        menuPosition: 'fixed' as const
      }
    : {};

  const componentsProps = hideSeparator
    ? {
        IndicatorSeparator: () => null
      }
    : {};

  return (
    <Select
      className={className}
      styles={customStyles}
      options={options}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={isMulti}
      components={componentsProps}
      menuPlacement={menuPlacement}
      {...menuProps}
    />
  );
};

export default ReactSelect;
