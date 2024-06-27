import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CircleHelp, SquareSigma } from 'lucide-react';

interface IRightSidebarProps {}

const helpCardContent = [
  {
    content: 'How to write a good question?',
    to: '#',
    icon: <CircleHelp size={20} strokeWidth={1.5} />
  },
  {
    content: 'How to write a good answer?',
    to: '#',
    icon: <CircleHelp size={20} strokeWidth={1.5} />
  },
  {
    content: 'How to use LaTeX to write math formulas?',
    to: '#',
    icon: <SquareSigma size={20} strokeWidth={1.5} />
  }
];

const RightSidebar: React.FC<IRightSidebarProps> = () => {
  return (
    <div className='w-72 shrink-0 py-6 text-sm'>
      <Card className='border-[#f4d27b]'>
        <CardHeader className='rounded-t-lg border-b-1 border-b-[#f4d27b] bg-[#faecc6] px-4 py-3'>
          <div className='font-bold'>Feature on MathU</div>
        </CardHeader>
        <CardContent className='rounded-lg bg-[#fdf7e7] px-4 py-3'>
          <ul className='space-y-4'>
            {helpCardContent.map((item, index) => (
              <li key={index} className='flex items-center gap-3'>
                {item.icon}
                <Link className='hover:underline' to={item.to}>
                  {item.content}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
