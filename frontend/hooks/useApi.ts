// API hook for data fetching
import { useState, useEffect } from 'react';
import { apiClient, ApiResponse, ApiError } from '@/services/api/client';
import { LoadingState } from '@/types';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  immediate?: boolean;
}

export function useApi<T = any>(
  endpoint: string,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError, immediate = true } = options;
  
  const [state, setState] = useState<LoadingState & { data?: T }>({
    status: 'idle',
    data: undefined,
    error: undefined,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, status: 'loading', error: undefined }));
    
    try {
      const response: ApiResponse<T> = await apiClient.get(endpoint);
      setState({
        status: 'success',
        data: response.data,
        error: undefined,
      });
      
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        status: 'error',
        data: undefined,
        error: apiError.message,
      });
      
      if (onError) {
        onError(apiError);
      }
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [endpoint, immediate]);

  return {
    ...state,
    refetch: execute,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}