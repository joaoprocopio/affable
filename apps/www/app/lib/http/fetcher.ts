import { HttpError } from "~/lib/http/errors"
import { isFn } from "~/utils/validators"

export type TFetcherOptions = RequestInit

export type TFetcherConfig = {
  baseURL?: string
  resolveDefaultOptions?: (options: TFetcherOptions) => TFetcherOptions
}

export function createFetcher(config: TFetcherConfig) {
  return async function fetcher(pathname: string, options?: TFetcherOptions): Promise<Response> {
    const url = new URL(`${config.baseURL}${pathname}`)

    const resolvedOptions = isFn(config.resolveDefaultOptions)
      ? config.resolveDefaultOptions(options || {})
      : options

    const response = await fetch(url, resolvedOptions)

    if (!response.ok) {
      throw new HttpError(response)
    }

    return response
  }
}
