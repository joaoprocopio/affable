import type { QueryFunctionContext } from "@tanstack/react-query"
import cookie from "js-cookie"
import { env } from "~/env"
import { createFetcher } from "~/lib/http/fetcher"

const coreFetch = createFetcher({
  baseURL: env.API_URL,
  resolveDefaultOptions(options) {
    options.credentials = "same-origin"

    const headers = new Headers(options.headers)

    const xsrfCookieName = "X-XSRF-TOKEN"
    const xsrfCookie = cookie.get("XSRF-TOKEN")

    if (xsrfCookie) {
      headers.set(xsrfCookieName, xsrfCookie)
    }

    options.headers = headers

    return options
  },
})

export async function getToken(context: QueryFunctionContext) {
  const response = await coreFetch("/v1/auth/token", {
    signal: context.signal,
  })

  return await response.text()
}

export async function getMe(context: QueryFunctionContext) {
  const response = await coreFetch("/v1/auth/me", {
    signal: context.signal,
  })

  return await response.json()
}
