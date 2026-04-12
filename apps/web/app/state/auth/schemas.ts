import * as z from "zod"

export const Name = z.string().nonempty("Name is required")

export type TNameIn = z.output<typeof Name>
export type TNameOut = z.output<typeof Name>

export const Email = z.string().nonempty("Email is required")

export type TEmailIn = z.output<typeof Email>
export type TEmailOut = z.output<typeof Email>

export const Password = z.string().nonempty("Password is required")

export type TPasswordIn = z.output<typeof Password>
export type TPasswordOut = z.output<typeof Password>

export const SignIn = z.object({
  email: Email,
  password: Password,
})

export type TSignInIn = z.input<typeof SignIn>
export type TSignInOut = z.output<typeof SignIn>

export const SignUp = z.object({
  name: Name,
  email: Email,
  password: Password,
})

export type TSignUpIn = z.input<typeof SignUp>
export type TSignUpOut = z.output<typeof SignUp>

export const User = z.object({
  name: Name,
  email: Email,
})

export type TUserIn = z.input<typeof User>
export type TUserOut = z.output<typeof User>
