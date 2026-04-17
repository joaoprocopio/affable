import { QueryClient } from "@tanstack/react-query"
import { defineKey, defineKeys, defineMutations, defineQueries } from "~/lib/query/utils/define"
import { mutationOptions, queryOptions } from "~/lib/query/utils/options"
import type { TPropertySlugOut } from "~/state/properties/schemas"
import * as propertiesServices from "~/state/properties/services"

export type TPropertiesNamespace = "properties"

export const propertiesQueryKeys = defineKeys<TPropertiesNamespace>()({
  all: () => defineKey("properties"),
  list: () => defineKey("properties", "list"),
  detail: (slug: TPropertySlugOut) => defineKey("properties", slug),
})

export const propertiesQueries = defineQueries<TPropertiesNamespace>()({
  list: () =>
    queryOptions({
      queryKey: propertiesQueryKeys.list(),
      queryFn: propertiesServices.listProperties,
      select(data) {
        return data.concat(data).concat(data).concat(data)
      },
    }),
  detail: (slug: TPropertySlugOut) =>
    queryOptions({
      queryKey: propertiesQueryKeys.detail(slug),
      queryFn: (context) => propertiesServices.getProperty(slug, context),
    }),
})

export const propertiesMutationKeys = defineKeys<TPropertiesNamespace>()({
  add: () => defineKey("properties", "add"),
})

export const propertiesMutations = defineMutations<TPropertiesNamespace>()({
  add: (client: QueryClient) =>
    mutationOptions({
      mutationKey: propertiesMutationKeys.add(),
      mutationFn: propertiesServices.addProperty,
      onSuccess(data) {
        client.setQueryData(propertiesQueryKeys.detail(data.slug), data)
        client.invalidateQueries({ queryKey: propertiesQueryKeys.all() })
      },
    }),
})
