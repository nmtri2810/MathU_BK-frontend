import { ITimestamp } from '.';

export interface ITag extends ITimestamp {
  id: number;
  name: string;
  description: string;
}
