// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFn(value: unknown): value is (...args: any[]) => any {
  return typeof value === "function"
}

export function isNil(value: unknown): value is null | undefined {
  return value == null
}

export function isFile(value: unknown): value is File {
  return value instanceof File
}

export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String
}

export function isPlainObject<K extends PropertyKey, V>(value: unknown): value is Record<K, V> {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value)
}

export function isIndexBounded<T>(array: T[], index: number): boolean {
  return index >= 0 && index < array.length
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

export function isFinite(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isInteger(value: unknown): value is number {
  return isFinite(parseInt(value as string))
}

export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true
  }

  if (isArray(value)) {
    return !value.length
  }

  if (isString(value)) {
    return !value.trim().length
  }

  if (isNumber(value)) {
    return !value && isFinite(value)
  }

  if (isBoolean(value)) {
    return false
  }

  if (value instanceof Map || value instanceof Set) {
    return !value.size
  }

  for (const key in value as object) {
    if (hasOwnProperty(value, key)) {
      return false
    }
  }

  return true
}

export function hasOwnProperty<T extends object, K extends PropertyKey>(obj: T, key: K): boolean {
  return Object.hasOwn(obj, key)
}

export function inInclusiveRange(v: number, start: number, end: number): boolean {
  return v >= start && v <= end
}
