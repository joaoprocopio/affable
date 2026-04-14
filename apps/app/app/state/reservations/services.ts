import type { QueryFunctionContext } from "@tanstack/react-query"
import { globalFetcher } from "~/lib/http/global"
import { ReservationListResponse } from "~/state/reservations/schemas"

export async function listReservations(context: QueryFunctionContext) {
  const response = await globalFetcher("/v1/reservations", {
    signal: context.signal,
  })
  const json = await response.json()

  return ReservationListResponse.parse(json)
}
