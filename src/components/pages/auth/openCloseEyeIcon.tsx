import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

interface IOpenCloseEyeIcon {
  isShowPassword: boolean;
  onClick: () => void;
}

export const OpenCloseEyeIcon: React.FC<IOpenCloseEyeIcon> = ({ isShowPassword, onClick }) => {
  const IconComponent = isShowPassword ? Eye : EyeOff;

  return (
    <IconComponent
      size={30}
      className='absolute right-2 top-1/2 -translate-y-1/2 select-none rounded-full p-1 hover:cursor-pointer hover:bg-gray-100'
      onClick={onClick}
    />
  );
};
