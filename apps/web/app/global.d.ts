/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  type AnyFn = (...args: any[]) => any
  type AnyArray<T = any> = T[] | readonly T[]
  type DeepMerge<A, B> = {
    // All B items are deep merged into A.
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never
  }
}

export {}
