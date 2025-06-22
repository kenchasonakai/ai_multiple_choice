// Common type definitions

// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface SelectOption {
  label: string;
  value: string;
}

// UI Component types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
}

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  status: Status;
  error?: string;
}