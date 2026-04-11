import * as z from "zod"

export const PropertySlug = z.string()

export type TPropertySlugIn = z.input<typeof PropertySlug>
export type TPropertySlugOut = z.output<typeof PropertySlug>

export const PropertyName = z
  .string()
  .nonempty("Name is required")
  .max(50, "Name must be 50 characters or less")

export type TPropertyNameIn = z.input<typeof PropertyName>
export type TPropertyNameOut = z.output<typeof PropertyName>

export const PropertyDescription = z
  .string()
  .max(500, "Description must be 500 characters or less")
  .optional()

export type TPropertyDescriptionIn = z.input<typeof PropertyDescription>
export type TPropertyDescriptionOut = z.output<typeof PropertyDescription>

export const PropertyBaseRate = z
  .int("Base rate is required")
  .positive("Base rate must be 0 or greater")

export type TPropertyBaseRateIn = z.input<typeof PropertyBaseRate>
export type TPropertyBaseRateOut = z.output<typeof PropertyBaseRate>

export const PropertyCountry = z.string().nonempty("Country is required")

export type TPropertyCountryIn = z.input<typeof PropertyCountry>
export type TPropertyCountryOut = z.output<typeof PropertyCountry>

export const PropertyCity = z.string().nonempty("City is required")

export type TPropertyCityIn = z.input<typeof PropertyCity>
export type TPropertyCityOut = z.output<typeof PropertyCity>

export const PropertyState = z.string().optional()

export type TPropertyStateIn = z.input<typeof PropertyState>
export type TPropertyStateOut = z.output<typeof PropertyState>

export const PropertyPostalCode = z.string().optional()

export type TPropertyPostalCodeIn = z.input<typeof PropertyPostalCode>
export type TPropertyPostalCodeOut = z.output<typeof PropertyPostalCode>

export const PropertyStreet = z.string().nonempty("Street is required")

export type TPropertyStreetIn = z.input<typeof PropertyStreet>
export type TPropertyStreetOut = z.output<typeof PropertyStreet>

export const PropertyUnit = z.string().optional()

export type TPropertyUnitIn = z.input<typeof PropertyUnit>
export type TPropertyUnitOut = z.output<typeof PropertyUnit>

export const AddProperty = z.object({
  name: PropertyName,
  description: PropertyDescription,
  baseRate: PropertyBaseRate,
  coverPhoto: z.file("Cover photo is required"),
  country: PropertyCountry,
  city: PropertyCity,
  state: PropertyState,
  postalCode: PropertyPostalCode,
  street: PropertyStreet,
  unit: PropertyUnit,
})

export type TAddPropertyIn = z.input<typeof AddProperty>
export type TAddPropertyOut = z.output<typeof AddProperty>

export const Property = z.object({
  slug: PropertySlug,
  name: PropertyName,
  description: PropertyDescription,
  baseRate: PropertyBaseRate,
  coverPhotoUrl: z.url().optional(),
  country: PropertyCountry,
  city: PropertyCity,
  state: PropertyState,
  postalCode: PropertyPostalCode,
  street: PropertyStreet,
  unit: PropertyUnit,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type TPropertyIn = z.input<typeof Property>
export type TPropertyOut = z.output<typeof Property>

export const PropertyList = z.array(Property)

export type TPropertyListIn = z.input<typeof PropertyList>
export type TPropertyListOut = z.output<typeof PropertyList>
