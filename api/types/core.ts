
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum DocStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export interface BaseDocument {
  id: string;
  docNo: string;
  docDate: string;
  status: DocStatus;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User;
}
