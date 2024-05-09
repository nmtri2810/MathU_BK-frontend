export interface IAction<T> {
  payload: T;
  type: string;
}

export interface IResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
