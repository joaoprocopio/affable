import type { QueryFunctionContext } from "@tanstack/react-query"
import { globalFetcher } from "~/lib/http/global"
import { User, type TSignInOut, type TSignUpOut } from "~/state/auth/schemas"

export async function token(context: QueryFunctionContext) {
  const response = await globalFetcher("/v1/auth/token", {
    signal: context.signal,
  })
  const text = await response.text()

  return text
}

export async function me(context: QueryFunctionContext) {
  const response = await globalFetcher("/v1/auth/me", {
    signal: context.signal,
  })
  const json = await response.json()

  return User.parse(json)
}

export async function signin(body: TSignInOut) {
  const response = await globalFetcher("/v1/auth/signin", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const json = await response.json()

  return User.parse(json)
}

export async function signup(body: TSignUpOut) {
  const response = await globalFetcher("/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  })
  const json = await response.json()

  return User.parse(json)
}

export async function signout() {
  const response = await globalFetcher("/v1/auth/signout", {
    method: "POST",
  })
  const text = await response.text()

  return text
}
