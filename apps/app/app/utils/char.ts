import { isString } from "~/utils/is"

// 65 = 'A'
// 90 = 'Z'
// 97 = 'a'
// 122 = 'z'
export const ALPHABET_CHAR_CODES = [65, 90, 97, 122] as const

export function isAlpha(char: string): boolean {
  if (!isString(char)) {
    return false
  }
  if (char.length !== 1) {
    return false
  }

  const code = char.charCodeAt(0)

  return (
    (code >= ALPHABET_CHAR_CODES[0] && code <= ALPHABET_CHAR_CODES[1]) ||
    (code >= ALPHABET_CHAR_CODES[2] && code <= ALPHABET_CHAR_CODES[3])
  )
}
