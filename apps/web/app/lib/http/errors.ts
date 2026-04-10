export class HttpError extends Error {
  public readonly response: Response

  constructor(response: Response) {
    super(`${response.url}: ${response.status} ${response.statusText}`)

    this.name = "HttpError"
    this.response = response
  }

  static is(value: unknown): value is HttpError {
    return value instanceof HttpError
  }
}
