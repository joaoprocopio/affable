import { useForm } from "@tanstack/react-form"
import { useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { Link, useRevalidator } from "react-router"
import { toast } from "sonner"
import { TosAndPPAgreementLink } from "~/components/tos-and-pp-agreement-link"
import { HttpError } from "~/lib/http/errors"
import { HttpStatus } from "~/lib/http/status"
import { Button } from "~/lib/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/lib/ui/input-group"
import { Spinner } from "~/lib/ui/spinner"
import { authMutationKeys, authMutations } from "~/state/auth/query"
import { SignUp } from "~/state/auth/schemas"
import { transformLaravelValidationError } from "~/utils/laravel"

export default function SignUpRoute() {
  const [showPassword, setShowPassword] = React.useState(false)

  const revalidator = useRevalidator()
  const queryClient = useQueryClient()

  const options = authMutations.signup(queryClient, revalidator.revalidate)
  const mutation = useMutation({
    ...options,
    async onError(error) {
      if (HttpError.is(error)) {
        if (error.response.status === HttpStatus.UnprocessableEntity) {
          form.setErrorMap({
            onSubmit: {
              fields: transformLaravelValidationError(await error.response.json()),
            },
          })
        }

        if (error.response.status === HttpStatus.Conflict) {
          form.setErrorMap({
            onSubmit: {
              fields: {
                email: {
                  message: "This email is already taken",
                },
              },
            },
          })
        }

        return undefined
      }

      toast.error("Unexpected error occurred", {
        description: <code>{error.toString()}</code>,
      })
    },
    onSuccess: (...args) => {
      options.onSuccess?.(...args)
      toast.dismiss()
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: SignUp,
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
        <FieldSet className="items-center">
          <FieldLegend className="text-center">Sign up to Affable</FieldLegend>

          <FieldDescription>
            Already have an account? <Link to="/signin">Sign in</Link>
          </FieldDescription>

          <FieldGroup>
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
                      placeholder="For booking notifications"
                      autoComplete="email"
                    />

                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      id={field.name}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your display name"
                      autoComplete="name"
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
                      placeholder="Minimum 8 characters"
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

          <FieldDescription className="text-center">
            <TosAndPPAgreementLink />
          </FieldDescription>
        </FieldSet>
      </form>
    </>
  )
}
