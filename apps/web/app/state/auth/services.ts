import type { QueryFunctionContext } from "@tanstack/react-query"
import cookie from "js-cookie"
import { env } from "~/env"
import { createFetcher } from "~/lib/http/fetcher"
import { User, type TSignInOut, type TSignUpOut } from "~/state/auth/schemas"

const coreFetch = createFetcher({
  baseURL: env.API_URL,
  resolveDefaultOptions(options) {
    options.credentials = "include"

    const headers = new Headers(options.headers)

    const xsrfCookieName = "X-XSRF-TOKEN"
    const xsrfCookie = cookie.get("XSRF-TOKEN")

    if (xsrfCookie) {
      headers.set(xsrfCookieName, xsrfCookie)
    }

    headers.set("Accept", "application/json")
    headers.set("Content-Type", "application/json")

    options.headers = headers

    return options
  },
})

export async function token(context: QueryFunctionContext) {
  const response = await coreFetch("/v1/auth/token", {
    signal: context.signal,
  })
  const text = await response.text()

  return text
}

export async function me(context: QueryFunctionContext) {
  const response = await coreFetch("/v1/auth/me", {
    signal: context.signal,
  })
  const json = await response.json()

  return User.parse(json)
}

export async function signin(body: TSignInOut) {
  const response = await coreFetch("/v1/auth/signin", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const json = await response.json()

  return User.parse(json)
}

export async function signup(body: TSignUpOut) {
  const response = await coreFetch("/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const json = await response.json()

  return User.parse(json)
}
