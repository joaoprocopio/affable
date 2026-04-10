export type Namespace = string
export type Definition = Record<string, AnyFn>

export type KeysDefinition<TNamespace extends Namespace, TDefinition extends Definition> = {
  [TDef in keyof TDefinition]: TDefinition[TDef] extends (...args: infer TArgs) => infer TReturn
    ? TReturn extends [...infer Keys]
      ? (...args: TArgs) => readonly [TNamespace, ...Keys]
      : never
    : never
}

export type QueriesDefinition<TNamespace extends Namespace, TDefinition extends Definition> = {
  [TDef in keyof TDefinition]: TDefinition[TDef] extends (...args: infer TArgs) => infer TReturn
    ? TReturn extends { queryKey: readonly [...infer Keys] }
      ? (...args: TArgs) => TReturn & { queryKey: readonly [TNamespace, ...Keys] }
      : never
    : never
}

export type MutationsDefinition<TNamespace extends Namespace, TDefinition extends Definition> = {
  [TDef in keyof TDefinition]: TDefinition[TDef] extends (...args: infer TArgs) => infer TReturn
    ? TReturn extends { mutationKey: readonly [...infer Keys] }
      ? (...args: TArgs) => TReturn & { mutationKey: readonly [TNamespace, ...Keys] }
      : never
    : never
}
