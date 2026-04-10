import { isBoolean } from "~/utils/is"

export function coerceBooleanish(value: unknown): boolean {
  if (isBoolean(value)) return value

  switch (value) {
    case "true":
    case "yes":
    case "on":
    case "1":
      return true
    case "false":
    case "no":
    case "off":
    case "0":
      return false
  }

  throw new TypeError(`Value "${value}" cannot be confidently coerced into a boolean.`)
}
