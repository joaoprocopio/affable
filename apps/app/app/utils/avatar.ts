import { isAlpha } from "~/utils/char"
import { isNil } from "~/utils/is"

const FALLBACK_INITIAL = "@"

export function composeInitials(name: string): string {
  const parts = name.split(" ")

  let initials = ""

  if (parts.length === 1) {
    const firstName = parts[0]!
    const firstNameChar = firstName[0]

    if (isNil(firstNameChar) || !isAlpha(firstNameChar)) {
      return FALLBACK_INITIAL
    }

    return firstNameChar.toUpperCase()
  }

  if (parts.length > 1) {
    const firstName = parts[0]!
    const firstNameChar = firstName[0]

    const lastName = parts[parts.length - 1]!
    const lastNameChar = lastName[0]

    if (isNil(firstNameChar) || isNil(lastNameChar)) {
      return FALLBACK_INITIAL
    }

    if (isAlpha(firstNameChar)) {
      initials += firstNameChar.toUpperCase()
    } else {
      initials += firstNameChar
    }

    if (isAlpha(lastNameChar)) {
      initials += lastNameChar.toUpperCase()
    } else {
      initials += lastNameChar
    }

    return initials
  }

  return FALLBACK_INITIAL
}
