import { isFn } from "~/utils/is"

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
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`)
    }

    return response
  }
}
