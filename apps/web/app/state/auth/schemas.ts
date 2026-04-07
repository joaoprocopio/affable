import * as z from "zod"

export const Email = z.email("Please enter an valid email address")

export type TEmailIn = z.output<typeof Email>
export type TEmailOut = z.output<typeof Email>

export const Password = z.string().nonempty("Password must not be empty")

export type TPasswordIn = z.output<typeof Password>
export type TPasswordOut = z.output<typeof Password>

export const SignIn = z.object({
  email: Email,
  password: Password,
})

export type TSignInIn = z.input<typeof SignIn>
export type TSignInOut = z.output<typeof SignIn>

export const SignUp = z.object({
  email: Email,
  password: Password,
})

export type TSignUpIn = z.input<typeof SignUp>
export type TSignUpOut = z.output<typeof SignUp>

export const User = z.object({
  email: Email,
})

export type TUserIn = z.input<typeof User>
export type TUserOut = z.output<typeof User>
