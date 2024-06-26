'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import {
  Order,
  Search,
  SimpleFilter,
  UpdateSimpleFilter,
  TableQueryStateProps,
  TableResponseData,
} from './types';
import {
  TABLE_QUERY_STATE_DEFAULT_VALUE,
  useTableQueryState,
} from './hooks/useTableQueryState';
import { getSearchParams } from '../../utils/http';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';

interface UseTableOptions {
  rowsPerPage?: number;
  page?: number;
  orderBy?: string;
  order?: Order;
  simpleFilter?: SimpleFilter;
  search?: Search;
  callbacks?: DataProviderRequestOptions;
  noPagination?: boolean;
}

export interface UpdateSearch {
  (search: Search | null, resetPage?: boolean): void;
}

export interface UseTableResult {
  data: unknown[];
  isPending: boolean;
  error: unknown;
  total: number;
  pageCount: number;
  execute: () => void;
  refresh: () => void;
  updateSimpleFilter: UpdateSimpleFilter;
  updateSearch: (search: Search | null, resetPage?: boolean) => void;
  simpleFilter: SimpleFilter;
  search: Search;
  tableQueryState: TableQueryStateProps;
  setTableQueryState: React.Dispatch<
    React.SetStateAction<TableQueryStateProps>
  >;
}

export type UseTableProps = (
  resource: string,
  options?: UseTableOptions,
) => UseTableResult;

/**
 * A custom hook for managing table data and state, including pagination, sorting, and filtering.
 *
 * @param resource - The resource URI for the table data.
 * @param options - Optional configuration options for the table.
 * @returns - An object containing data, state, and functions related to the table.
 */
const useTable: UseTableProps = (resource, options) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useDataProvider();
  const firstRender = useRef(true);

  const { tableQueryState, setTableQueryState } = useTableQueryState(options);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      simpleFilter: JSON.stringify(tableQueryState?.simpleFilter),
    });

    router.replace(`${pathname}?${newSearchParam ?? ''}`);
  }, [JSON.stringify(tableQueryState.simpleFilter)]);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      search: JSON.stringify(tableQueryState?.search),
    });

    router.replace(`${pathname}?${newSearchParam ?? ''}`);
  }, [JSON.stringify(tableQueryState.search)]);

  const simpleFilterQuery = () => {
    if (!tableQueryState.simpleFilter) return;

    const queryArr = [];
    for (const [key, value] of Object.entries(tableQueryState.simpleFilter)) {
      queryArr.push(`${key}${value}`);
    }
    return queryArr as string[];
  };

  useEffect(() => {
    execute();
  }, [JSON.stringify(tableQueryState)]);

  const getResource = () => {
    return get({
      uri: resource,
      queryParams: {
        ...(tableQueryState?.rowsPerPage &&
          !options?.noPagination && {
            limit: tableQueryState.rowsPerPage,
          }),
        page: tableQueryState.page,
        ...(tableQueryState?.orderBy && {
          sort: `${
            tableQueryState?.orderBy
          },${tableQueryState?.order.toUpperCase()}`,
        }),
        ...(tableQueryState?.simpleFilter && { filter: simpleFilterQuery() }),
        ...(tableQueryState?.search && {
          s: JSON.stringify(tableQueryState?.search),
        }),
      },
    });
  };

  const { data, execute, refresh, isPending, error } =
    useQuery<TableResponseData>(getResource, false, options?.callbacks);

  // TODO: This will be refactored with Query Builder
  // For now it works even though not optmized
  const updateSimpleFilter = (
    simpleFilter: SimpleFilter | null,
    resetPage = true,
  ) => {
    setTableQueryState((prevState) => {
      // Removed current simpleFilter from state
      const updatedState = { ...prevState };

      for (const entries of Object.entries(simpleFilter)) {
        const [key, value] = entries;

        // Loose equality evals for `undefined` and `null`
        if (value == null) {
          delete updatedState?.simpleFilter?.[key];
        } else {
          if (typeof updatedState?.simpleFilter === 'undefined') {
            updatedState.simpleFilter = {
              [key]: value,
            };
          } else {
            updatedState.simpleFilter[key] = value;
          }
        }
      }

      const updatedSimpleFilter =
        updatedState?.simpleFilter &&
        Object.keys(updatedState.simpleFilter).length > 0
          ? updatedState.simpleFilter
          : undefined;

      const res = {
        ...(updatedState && {
          ...updatedState,
          ...(resetPage &&
            !firstRender.current && {
              page: TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            }),
          simpleFilter: updatedSimpleFilter,
        }),
      };

      if (firstRender.current) {
        firstRender.current = false;
      }

      return res;
    });
  };

  // TODO: This will be refactored with Query Builder
  // For now it works even though not optmized
  const updateSearch: UpdateSearch = (
    search: Search | null,
    resetPage = true,
  ) => {
    setTableQueryState((prevState) => {
      // Removed current search from state
      const updatedState = { ...prevState };

      if (search === null) {
        updatedState.search = undefined;
      }

      if (search) {
        for (const entries of Object.entries(search)) {
          const [key, value] = entries;

          // Loose equality evals for `undefined` and `null`
          if (value == null) {
            delete updatedState?.search?.[key];
          } else {
            // This will update the search
            // should only no update if value is null or undefined
            if (typeof updatedState?.search === 'undefined') {
              updatedState.search = {
                [key]: value,
              };
            } else {
              updatedState.search[key] = value;
            }
          }
        }
      }

      const updatedSearch =
        updatedState?.search && Object.keys(updatedState.search).length > 0
          ? updatedState.search
          : undefined;

      const res = {
        ...(updatedState && {
          ...updatedState,
          ...(resetPage &&
            !firstRender.current && {
              page: TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            }),
          search: updatedSearch,
        }),
      };

      if (firstRender.current) {
        firstRender.current = false;
      }

      return res;
    });
  };

  return {
    data: data?.data,
    isPending,
    error,
    execute,
    refresh,
    updateSimpleFilter,
    simpleFilter: tableQueryState?.simpleFilter,
    updateSearch,
    search: tableQueryState?.search,
    total: data?.total,
    pageCount: data?.pageCount,
    tableQueryState,
    setTableQueryState,
  };
};

export default useTable;
