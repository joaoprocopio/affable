import type { DefaultError, MutationKey, UseMutationOptions } from "@tanstack/react-query"

export function mutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
  TMutationKey = MutationKey,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    mutationKey: TMutationKey
  },
) {
  return options
}

export { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
