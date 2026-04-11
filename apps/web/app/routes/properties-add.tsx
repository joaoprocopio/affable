import { useForm, useStore } from "@tanstack/react-form"
import { useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query"
import { Image, X } from "lucide-react"
import { toast } from "sonner"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { HttpError } from "~/lib/http/errors"
import { HttpStatus } from "~/lib/http/status"
import { Button } from "~/lib/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/lib/ui/empty"
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
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "~/lib/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "~/lib/ui/item"
import { Spinner } from "~/lib/ui/spinner"
import { propertiesMutationKeys, propertiesMutations } from "~/state/properties/query"
import { AddProperty, type TAddPropertyIn, type TAddPropertyOut } from "~/state/properties/schemas"
import { formatBytes } from "~/utils/format"
import { isFile } from "~/utils/is"
import { transformLaravelValidationError } from "~/utils/laravel"

export const handle: Handle = {
  breadcrumb: "Add",
}

export default function PropertiesAddRoute() {
  const queryClient = useQueryClient()

  const options = propertiesMutations.add(queryClient)
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
      baseRate: undefined as unknown as number,
      city: "",
      country: "",
      name: "",
      street: "",
      coverPhoto: undefined as unknown as File,
      description: "",
      postalCode: "",
      state: "",
      unit: "",
    } satisfies TAddPropertyIn as TAddPropertyIn,
    validators: {
      onSubmit: AddProperty,
    },
    onSubmit(props) {
      mutation.mutate(props.value as unknown as TAddPropertyOut)
    },
    onSubmitInvalid() {
      const el = document.querySelector('[aria-invalid="true"]') as HTMLElement | undefined
      el?.focus()
    },
  })
  const coverPhoto = useStore(form.store, (snap) => snap.values.coverPhoto)
  const coverPhotoURL = isFile(coverPhoto) ? URL.createObjectURL(coverPhoto) : undefined

  const isMutating = useIsMutating({ mutationKey: propertiesMutationKeys.add() })
  const isLoading = Boolean(isMutating)

  return (
    <div>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />
      </AppHeader>

      <div className="mx-auto max-w-2xl px-6 pt-8 pb-64">
        <form
          noValidate
          className="flex flex-col gap-16"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}>
          <FieldSet>
            <FieldLegend>Property</FieldLegend>
            <FieldDescription>Visible to guests on all platforms</FieldDescription>

            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  const characterCount = field.state.value.length

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          value={field.state.value}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Guests will see this on listings"
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText>{characterCount}/50</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="coverPhoto"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Cover photo</FieldLabel>

                      {coverPhoto && coverPhotoURL ? (
                        <Item variant="outline">
                          <ItemContent>
                            <ItemTitle>{coverPhoto.name}</ItemTitle>
                            <ItemDescription>{formatBytes(coverPhoto.size)}</ItemDescription>
                          </ItemContent>

                          <ItemActions>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => field.handleChange(undefined as unknown as File)}>
                              <X />
                            </Button>
                          </ItemActions>

                          <ItemHeader>
                            <img
                              src={coverPhotoURL}
                              alt="Cover preview"
                              className="size-full object-cover"
                            />
                          </ItemHeader>
                        </Item>
                      ) : (
                        <label className="cursor-pointer">
                          <Empty className="border border-dashed">
                            <EmptyHeader>
                              <EmptyMedia variant="icon">
                                <Image className="size-6" />
                              </EmptyMedia>
                              <EmptyTitle>Add cover photo</EmptyTitle>
                              <EmptyDescription>
                                Any image format is accepted. Max 5MB.
                              </EmptyDescription>
                            </EmptyHeader>
                          </Empty>

                          <Input
                            id={field.name}
                            type="file"
                            accept="image/*"
                            className="opacity-0"
                            aria-invalid={isInvalid}
                            onChange={(e) =>
                              field.handleChange(
                                (e.target.files?.[0] ?? undefined) as unknown as File,
                              )
                            }
                            onBlur={field.handleBlur}
                          />
                        </label>
                      )}

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  const characterCount = field.state.value?.length || 0

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Description
                        <FieldDescription>(if applicable)</FieldDescription>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          value={field.state.value ?? ""}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="What makes your place unique..."
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText>{characterCount}/500</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="baseRate"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Base rate</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id={field.name}
                          value={field.state.value}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                          type="number"
                          placeholder="0"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>/night</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Location</FieldLegend>
            <FieldDescription>Full address for guests and platforms</FieldDescription>

            <FieldGroup>
              <form.Field
                name="country"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Where is your property?"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="city"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="state"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        State
                        <FieldDescription>(if applicable)</FieldDescription>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value ?? ""}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="postalCode"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Postal code
                        <FieldDescription>(if applicable)</FieldDescription>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value ?? ""}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="street"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Street address"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="unit"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Unit
                        <FieldDescription>(if applicable)</FieldDescription>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value ?? ""}
                        aria-invalid={isInvalid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Optional"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Button type="submit" disabled={isLoading}>
                Continue
                {isLoading && <Spinner strokeWidth={3} />}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  )
}
