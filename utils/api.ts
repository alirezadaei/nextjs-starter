"use client";

import { useNotificationContext } from "@/providers/notification";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "@/lib/axios";
import { errorMessage } from "@/utils/error-message";

/**
 * custom error message configuration type
 * maps HTTP status codes to custom error messages and descriptions
 */
export type CustomErrorMessageType = Record<
  number,
  { message?: string; description?: string }
>;

/**
 * common options for all API hooks
 */
export type ApiHookOptions<T> = {
  queryKeyParam?: T;
  customErrorMessage?: CustomErrorMessageType;
  queryOptions?: Record<string, unknown>;
  showToastOnError?: boolean;
};

/**
 * parameters for API calls
 */
type ApiCallParamsType = {
  endpoint: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
};

/**
 * configuration type for error handling
 */
type ErrorHandlingConfig<T> = {
  apiCallFn: () => Promise<T>;
  customErrorMessage?: CustomErrorMessageType;
  showToastOnError?: boolean;
};

/**
 * centralized error handling wrapper for all API calls
 */

export const useHandleApiError = () => {
  const notification = useNotificationContext();
  return (
    error: Error | AxiosError,
    customErrorMessage?: CustomErrorMessageType,
    showToastOnError = true
  ): never => {
    if (showToastOnError) {
      errorMessage(error, notification, customErrorMessage);
    }
    throw error;
  };
};

/**
 * core API call function that handles requests through axios
 */
export const apiCall = async <T>({
  endpoint,
  method,
  data,
}: ApiCallParamsType): Promise<T> => {
  try {
    let result: AxiosResponse = await axiosInstance<T>({
      url: endpoint,
      method,
      data,
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.status || 500));
    }
    throw error;
  }
};

/**
 * wrapper function to handle the common try-catch pattern
 */

export const useWithErrorHandling = <T>() => {
  const handleApiError = useHandleApiError();
  return async ({
    apiCallFn,
    customErrorMessage,
    showToastOnError = true,
  }: ErrorHandlingConfig<T>): Promise<T> => {
    try {
      return await apiCallFn();
    } catch (error) {
      return handleApiError(
        error as Error,
        customErrorMessage,
        showToastOnError
      );
    }
  };
};

/**
 * Parameters for creating a base query
 */
type CreateBaseQueryParams<TData, TParam> = {
  /** Function to generate the query key */
  queryKeyFn: (params: TParam) => unknown[];
  /** Function to perform the API call */
  queryFn: (params: TParam) => Promise<TData>;
  /** Additional options for the query */
  options?: {
    showToastOnError?: boolean;
  };
};

/**
 * Creates a base query hook with common error handling and configuration
 * @returns A configured useQuery hook
 */
export const createBaseQuery = <TData, TParam>({
  queryKeyFn,
  queryFn,
  options,
}: CreateBaseQueryParams<TData, TParam>) => {
  return ({
    queryKeyParam,
    customErrorMessage,
    queryOptions,
    showToastOnError,
  }: ApiHookOptions<TParam> = {}) => {
    const withErrorHandling = useWithErrorHandling<TData>();
    return useQuery<TData>({
      queryKey: queryKeyFn(queryKeyParam as TParam),
      queryFn: () =>
        withErrorHandling({
          apiCallFn: () => queryFn(queryKeyParam as TParam),
          customErrorMessage,
          showToastOnError:
            showToastOnError !== undefined
              ? showToastOnError
              : options?.showToastOnError !== undefined
              ? options.showToastOnError
              : true,
        }),
      ...queryOptions,
    });
  };
};

/**
 * Parameters for creating a base suspense query
 */
type CreateBaseSuspenseQueryParams<TData, TParam> = {
  /** Function to generate the query key */
  queryKeyFn: (params: TParam) => unknown[];
  /** Function to perform the API call */
  queryFn: (params: TParam) => Promise<TData>;
  /** Additional options for the query */
  options?: {
    showToastOnError?: boolean;
  };
};

/**
 * Creates a base suspense query hook with common error handling and configuration
 * @returns A configured useSuspenseQuery hook
 */
export const createBaseSuspenseQuery = <TData, TParam>({
  queryKeyFn,
  queryFn,
  options,
}: CreateBaseSuspenseQueryParams<TData, TParam>) => {
  return ({
    queryKeyParam,
    customErrorMessage,
    queryOptions,
    showToastOnError,
  }: ApiHookOptions<TParam> = {}) => {
    const withErrorHandling = useWithErrorHandling<TData>();
    return useSuspenseQuery<TData>({
      queryKey: queryKeyFn(queryKeyParam as TParam),
      queryFn: () =>
        withErrorHandling({
          apiCallFn: () => queryFn(queryKeyParam as TParam),
          customErrorMessage,
          showToastOnError:
            showToastOnError !== undefined
              ? showToastOnError
              : options?.showToastOnError !== undefined
              ? options.showToastOnError
              : true,
        }),
      ...queryOptions,
    });
  };
};

/**
 * Parameters for creating a base mutation
 */
type CreateBaseMutationParams<TData, TParams> = {
  /** Function to generate the mutation key */
  mutationKeyFn?: (params: TParams) => unknown[];
  /** Function to perform the API call */
  mutationFn: (params: TParams) => Promise<TData>;
  /** Additional options for the mutation */
  options?: {
    showToastOnError?: boolean;
  };
};

/**
 * Creates a base mutation hook with common error handling and configuration
 * @returns A configured useMutation hook
 */
export const createBaseMutation = <TData, TParams = void>({
  mutationKeyFn,
  mutationFn,
  options,
}: CreateBaseMutationParams<TData, TParams>) => {
  return ({
    queryKeyParam,
    customErrorMessage,
    queryOptions,
    showToastOnError,
  }: ApiHookOptions<TParams> = {}) => {
    const withErrorHandling = useWithErrorHandling<TData>();
    return useMutation<TData, Error, TParams>({
      mutationKey:
        mutationKeyFn && queryKeyParam !== undefined
          ? mutationKeyFn(queryKeyParam as TParams)
          : undefined,
      mutationFn: (params) =>
        withErrorHandling({
          apiCallFn: () => mutationFn(params),
          customErrorMessage,
          showToastOnError:
            showToastOnError !== undefined
              ? showToastOnError
              : options?.showToastOnError !== undefined
              ? options.showToastOnError
              : true,
        }),
      ...queryOptions,
    });
  };
};
