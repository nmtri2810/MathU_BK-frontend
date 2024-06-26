import { IResponse, ITimestamp } from '.';

export interface ITag extends ITimestamp {
  id: number;
  name: string;
  description: string;
}

export interface ITagState {
  list: ITag[] | null;
  listLoading: boolean;
  status: string;
}

export type TListTagResponse = IResponse<ITag[]>;
