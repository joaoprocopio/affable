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
            <FieldLegend>Property</FieldLegend>
            <FieldDescription>Visible to guests on all platforms</FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea placeholder="Guests will see this on listings" />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/50</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea placeholder="What makes your place unique..." />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/500</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Base rate</FieldLabel>
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
            <FieldDescription>Full address for guests and platforms</FieldDescription>

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
                <FieldLabel>Unit</FieldLabel>
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
