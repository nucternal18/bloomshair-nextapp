import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

type QueryKeyT = any;

// export const useFetch = <T,>(
//   url: string | null,
//   params?: object,
//   config?: UseQueryOptions<T, Error, T, QueryKeyT>
// ) => {
//   const context = useQuery<T, Error, T, QueryKeyT>(
//     [url, params],
//     ({ queryKey }) => fetcher({ queryKey }),
//     {
//       enabled: !!url,
//       ...config,
//     }
//   );

//   return context;
// };

export const fetcher = async <T,>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  const res = await fetch(`${url}?${new URLSearchParams(params)}`);
  return await res.json();
};
