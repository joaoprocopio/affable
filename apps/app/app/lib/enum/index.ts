/* eslint-disable @typescript-eslint/no-explicit-any */
export type EnumExtra = object

export type EnumKey = PropertyKey

export type Enum<TKey extends EnumKey, TExtra extends EnumExtra = EnumExtra> = {
  [MK in TKey]: DeepMerge<{ value: MK }, TExtra>
}

export function constEnum<
  const TKey extends EnumKey,
  const TExtra extends EnumExtra = EnumExtra,
  const TEnum extends Enum<TKey, TExtra> = Enum<TKey, TExtra>,
>(e: TEnum): TEnum {
  return e
}

export function constEnumToValues<
  const TKey extends EnumKey,
  const TExtra extends EnumExtra = EnumExtra,
  const TEnum extends Enum<TKey, TExtra> = Enum<TKey, TExtra>,
>(e: TEnum) {
  type TEnumItem = TEnum[keyof TEnum]
  type TEnumItemValues = TEnumItem["value"][]

  return Object.values(e).map((item: any) => (item as TEnumItem).value) as [
    TEnumItemValues[number],
    ...TEnumItemValues,
  ]
}
