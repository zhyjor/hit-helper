
declare namespace Base {
  type Response<T> = {
    data: T,
    success: boolean;
    message?: string;
  };
}
