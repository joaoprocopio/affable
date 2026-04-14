import * as z from "zod"

export const ReservationId = z.union([z.string(), z.number()]).transform(String)

export type TReservationIdIn = z.input<typeof ReservationId>
export type TReservationIdOut = z.output<typeof ReservationId>

export const ReservationProvider = z.string()

export type TReservationProviderIn = z.input<typeof ReservationProvider>
export type TReservationProviderOut = z.output<typeof ReservationProvider>

export const ReservationStatus = z.string()

export type TReservationStatusIn = z.input<typeof ReservationStatus>
export type TReservationStatusOut = z.output<typeof ReservationStatus>

export const ReservationGuest = z
  .object({
    name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
  })
  .nullable()
  .optional()

export type TReservationGuestIn = z.input<typeof ReservationGuest>
export type TReservationGuestOut = z.output<typeof ReservationGuest>

export const ReservationProperty = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
  })
  .nullable()
  .optional()

export type TReservationPropertyIn = z.input<typeof ReservationProperty>
export type TReservationPropertyOut = z.output<typeof ReservationProperty>

export const Reservation = z.object({
  id: ReservationId,
  provider: ReservationProvider,
  status: ReservationStatus,
  property: ReservationProperty,
  externalId: z.string().nullable().optional(),
  channelReservationId: z.string().nullable().optional(),
  checkIn: z.string().nullable().optional(),
  checkOut: z.string().nullable().optional(),
  nights: z.number().nullable().optional(),
  guests: z.number().nullable().optional(),
  total: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  bookedAt: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  acknowledgedAt: z.string().nullable().optional(),
  guest: ReservationGuest,
  emailStatus: z.string().nullable().optional(),
  emailSentAt: z.string().nullable().optional(),
})

export type TReservationIn = z.input<typeof Reservation>
export type TReservationOut = z.output<typeof Reservation>

export const ReservationList = z.array(Reservation)

export type TReservationListIn = z.input<typeof ReservationList>
export type TReservationListOut = z.output<typeof ReservationList>

export const ReservationListResponse = z
  .union([ReservationList, z.object({ data: ReservationList })])
  .transform((value) => (Array.isArray(value) ? value : value.data))

export type TReservationListResponseIn = z.input<typeof ReservationListResponse>
export type TReservationListResponseOut = z.output<typeof ReservationListResponse>
