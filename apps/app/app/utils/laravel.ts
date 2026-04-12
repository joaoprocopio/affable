export type LaravelValidationError = {
  message: string
  errors: Record<string, Array<string>>
}

export function transformLaravelValidationError(error: LaravelValidationError) {
  return Object.fromEntries(
    Object.entries(error.errors).map((entry) => [
      entry[0],
      entry[1].map((message) => ({ message: message })),
    ]),
  )
}
