export type TFetcherConfig = {
  baseURL?: string
}

export function createFetcher(config: TFetcherConfig) {
  return async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${config.baseURL}${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`[fetcher]: ${response.status} ${response.statusText} `)
    }

    return await response.json()
  }
}
