import type {
  Definition,
  KeysDefinition,
  MutationsDefinition,
  Namespace,
  QueriesDefinition,
} from "~/lib/query/utils/types"

export function defineKey<const TKeys extends AnyArray>(...args: TKeys) {
  return args
}

export function defineKeys<const TNamespace extends Namespace>() {
  return function <
    const TDefinition extends Definition,
    const TKeysDefinition extends KeysDefinition<TNamespace, TDefinition> = KeysDefinition<
      TNamespace,
      TDefinition
    >,
  >(keys: TKeysDefinition) {
    return keys
  }
}

export function defineQueries<const TNamespace extends Namespace>() {
  return function <
    const TDefinition extends Definition,
    const TQueriesDefinition extends QueriesDefinition<TNamespace, TDefinition> = QueriesDefinition<
      TNamespace,
      TDefinition
    >,
  >(queries: TQueriesDefinition) {
    return queries
  }
}

export function defineMutations<const TNamespace extends Namespace>() {
  return function <
    const TDefinition extends Definition,
    const TMutationsDefinition extends MutationsDefinition<TNamespace, TDefinition> =
      MutationsDefinition<TNamespace, TDefinition>,
  >(mutations: TMutationsDefinition) {
    return mutations
  }
}
