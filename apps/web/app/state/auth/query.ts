import { defineKey, defineKeys, defineQueries } from "~/lib/query/utils/define"
import { queryOptions } from "~/lib/query/utils/options"
import * as authServices from "~/state/auth/services"

export type TAuthNamespace = "auth"

export const authQueryKeys = defineKeys<TAuthNamespace>()({
  token: () => defineKey("auth", "token"),
})

export const authQueries = defineQueries<TAuthNamespace>()({
  token: () =>
    queryOptions({
      queryKey: authQueryKeys.token(),
      queryFn: (context) => authServices.getToken(context),
    }),
})
