export interface IAction<T> {
  payload: T;
  type: string;
}

export interface IResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface IPaginationPayload {
  page: number;
  perPage: number;
  keyword: string;
}

export interface IPaginationMetaResponse {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface ITimestamp {
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
