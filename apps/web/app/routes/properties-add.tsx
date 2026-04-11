import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import { Button } from "~/lib/ui/button"
import {
  Field,
  FieldDescription,
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

export const handle: Handle = {
  breadcrumb: "Add",
}

export default function PropertiesAddRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderBreadcrumb />
      </AppHeader>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <form
          className="flex flex-col gap-16"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          <FieldSet>
            <FieldLegend>About</FieldLegend>
            <FieldDescription>
              This information will help you easily identify your property
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/50</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/500</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Price per night</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Address</FieldLegend>
            <FieldDescription>
              Your property address is required and is only used for identification purposes
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>City</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>
                  State <FieldDescription>(if applicable)</FieldDescription>
                </FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>
                  Postal code
                  <FieldDescription>(if applicable)</FieldDescription>
                </FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>Address line 1</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>
                  Address line 2 <FieldDescription>(if applicable)</FieldDescription>
                </FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>
                  Address line 3 <FieldDescription>(if applicable)</FieldDescription>
                </FieldLabel>
                <Input />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Button type="submit">Continue</Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  )
}
