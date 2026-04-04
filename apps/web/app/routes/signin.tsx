import { TosAndPPAgreementLink } from "~/components/tos-and-pp-agreement-link"
import { Button } from "~/lib/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-lg font-bold">Sign in to Affable</h1>
                <FieldDescription>
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Enter your email address..." />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Password</FieldLabel>
                <Input id="password" type="password" />
              </Field>

              <Field>
                <Button type="submit">Continue</Button>
              </Field>
            </FieldGroup>
          </form>
          <FieldDescription className="px-6 text-center">
            <TosAndPPAgreementLink />
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}
