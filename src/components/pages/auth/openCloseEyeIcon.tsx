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
      className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer select-none hover:bg-gray-100 rounded-full p-1'
      onClick={onClick}
    />
  );
};
