import cookie from "js-cookie"
import { env } from "~/env"
import { createFetcher } from "~/lib/http/fetcher"

export const globalFetcher = createFetcher({
  baseURL: env.API_URL,
  resolveDefaultOptions(options) {
    options.credentials = "include"

    const headers = new Headers(options.headers)

    const xsrfCookieName = "X-XSRF-TOKEN"
    const xsrfCookie = cookie.get("XSRF-TOKEN")

    if (xsrfCookie) {
      headers.set(xsrfCookieName, xsrfCookie)
    }

    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json")
    }

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json")
    }

    options.headers = headers

    return options
  },
})
