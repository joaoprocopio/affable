import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import { Button } from "~/lib/ui/button"
import {
  Field,
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
            <FieldLegend>Property details</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea placeholder="What guests will see first..." />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/50</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea placeholder="Tell guests about your place..." />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/500</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Price</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="0" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>/night</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Location</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Input placeholder="Where is your property?" />
              </Field>

              <Field>
                <FieldLabel>City</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>State</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>Postal code</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>Street</FieldLabel>
                <Input placeholder="Street address" />
              </Field>

              <Field>
                <FieldLabel>Apt, suite, etc.</FieldLabel>
                <Input placeholder="Optional" />
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
