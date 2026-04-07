import { QueryClient } from "@tanstack/react-query"
import { HttpError } from "~/lib/http/errors"
import { HttpStatus } from "~/lib/http/status"
import { defineKey, defineKeys, defineMutations, defineQueries } from "~/lib/query/utils/define"
import { mutationOptions, queryOptions } from "~/lib/query/utils/options"
import * as authServices from "~/state/auth/services"

export type TAuthNamespace = "auth"

export const authQueryKeys = defineKeys<TAuthNamespace>()({
  me: () => defineKey("auth", "me"),
  token: () => defineKey("auth", "token"),
})

export const authQueries = defineQueries<TAuthNamespace>()({
  me: () =>
    queryOptions({
      queryKey: authQueryKeys.me(),
      queryFn: authServices.me,
      staleTime: Infinity,
      retry(failureCount, error) {
        if (HttpError.is(error)) {
          return HttpStatus.isServerError(error.response.status)
        }

        return failureCount < 3
      },
    }),
  token: () =>
    queryOptions({
      queryKey: authQueryKeys.token(),
      queryFn: authServices.token,
      staleTime: Infinity,
    }),
})

export const authMutationKeys = defineKeys<TAuthNamespace>()({
  signin: () => defineKey("auth", "signin"),
  signup: () => defineKey("auth", "signup"),
})

export const authMutations = defineMutations<TAuthNamespace>()({
  signin: (client: QueryClient) =>
    mutationOptions({
      mutationKey: authMutationKeys.signin(),
      mutationFn: authServices.signin,
      onSuccess(data) {
        client.setQueryData(authQueryKeys.me(), data)
      },
    }),
  signup: (client: QueryClient) =>
    mutationOptions({
      mutationKey: authMutationKeys.signup(),
      mutationFn: authServices.signup,
      onSuccess(data) {
        client.setQueryData(authQueryKeys.me(), data)
      },
    }),
})
