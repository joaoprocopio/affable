import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { TosAndPPAgreementLink } from "~/components/tos-and-pp-agreement-link"
import { Button } from "~/lib/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/lib/ui/input-group"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl font-bold">Sign up to Affable</h1>
                <FieldDescription>
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" type="name" placeholder="Enter your name..." />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Enter your email address..." />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    placeholder="Enter your password..."
                    type={showPassword ? "text" : "password"}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="outline"
                      size="icon-xs"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye className="size-3.5" />
                      ) : (
                        <EyeOff className="size-3.5" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
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
