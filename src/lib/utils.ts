import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTitleForURL = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

export const formatTimeFromNow = (time: string | undefined) => {
  return dayjs(time).fromNow();
};

export const dayjsFormat = (time: string | undefined, format: string) => {
  return dayjs(time).format(format);
};
