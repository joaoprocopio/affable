import type { QueryFunctionContext } from "@tanstack/react-query"
import { globalFetcher } from "~/lib/http/global"
import {
  Property,
  PropertyList,
  type TAddPropertyOut,
  type TPropertySlugOut,
} from "~/state/properties/schemas"
import { isNumber } from "~/utils/is"

export async function listProperties(context: QueryFunctionContext) {
  const response = await globalFetcher("/v1/properties", {
    signal: context.signal,
  })
  const json = await response.json()

  return PropertyList.parse(json)
}

export async function getProperty(slug: TPropertySlugOut, context: QueryFunctionContext) {
  const response = await globalFetcher(`/v1/properties/${slug}`, {
    signal: context.signal,
  })
  const json = await response.json()

  return Property.parse(json)
}

export async function addProperty(body: TAddPropertyOut) {
  const formData = new FormData()

  Object.entries(body).forEach(([entry, value]) => {
    formData.append(entry, isNumber(value) ? value.toString() : value!)
  })

  const response = await globalFetcher("/v1/properties", {
    method: "POST",
    body: formData,
  })
  const json = await response.json()

  return Property.parse(json)
}
