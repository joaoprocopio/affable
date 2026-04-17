import { defineKey, defineKeys, defineQueries } from "~/lib/query/utils/define"
import { queryOptions } from "~/lib/query/utils/options"
import * as reservationsServices from "~/state/reservations/services"

export type TReservationsNamespace = "reservations"

export const reservationsQueryKeys = defineKeys<TReservationsNamespace>()({
  list: () => defineKey("reservations", "list"),
})

export const reservationsQueries = defineQueries<TReservationsNamespace>()({
  list: () =>
    queryOptions({
      queryKey: reservationsQueryKeys.list(),
      queryFn: reservationsServices.listReservations,
    }),
})
