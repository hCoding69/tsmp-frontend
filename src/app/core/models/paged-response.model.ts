export interface PagedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  totalElements: number;
  pageSize: number;
  totalPages: number;
  last: boolean;
  timestamp: string;
}