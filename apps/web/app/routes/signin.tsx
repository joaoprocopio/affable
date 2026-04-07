import { useForm } from "@tanstack/react-form"
import { useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { Link, useRevalidator } from "react-router"
import { toast } from "sonner"
import { TosAndPPAgreementLink } from "~/components/tos-and-pp-agreement-link"
import { HttpError } from "~/lib/http/errors"
import { Button } from "~/lib/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/lib/ui/input-group"
import { Spinner } from "~/lib/ui/spinner"
import { authMutationKeys, authMutations } from "~/state/auth/query"
import { SignIn } from "~/state/auth/schemas"

export default function SignInRoute() {
  const [showPassword, setShowPassword] = React.useState(false)

  const revalidator = useRevalidator()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    ...authMutations.signin(queryClient, revalidator.revalidate),
    onError: (error) => {
      if (!HttpError.is(error)) {
        toast.message("Something went wrong", {
          description: <code>{error.toString()}</code>,
        })

        return undefined
      }

      toast.message("Email or password may be invalid")
    },
  })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: SignIn,
    },
    onSubmit(props) {
      mutation.mutate(props.value)
    },
  })

  const isMutating = useIsMutating({ mutationKey: authMutationKeys.signin() })
  const isLoading = Boolean(isMutating)

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Sign in to Affable</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </div>

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="Enter your email address..."
                    autoComplete="email"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="password"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password..."
                      autoComplete="current-password"
                    />

                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="outline"
                        size="icon-xs"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}>
                        {showPassword ? (
                          <Eye className="size-3.5" />
                        ) : (
                          <EyeOff className="size-3.5" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <Button type="submit" disabled={isLoading}>
            Continue
            {isLoading && <Spinner strokeWidth={3} />}
          </Button>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        <TosAndPPAgreementLink />
      </FieldDescription>
    </>
  )
}
