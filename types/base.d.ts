
declare namespace Base {
  type Response<T> = {
    data: T,
    success: boolean;
    message?: string;
  };
  type Page<T> = {
    list: Array<T>,
    total: number;
    pageNo: number;
    pageSize: number;
  }
}
