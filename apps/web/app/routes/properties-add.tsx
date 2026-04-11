import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"
import { Textarea } from "~/lib/ui/textarea"

export const handle: Handle = {
  breadcrumb: "Add",
}

// 1. address

export default function PropertiesAddRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderBreadcrumb />
      </AppHeader>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <form className="flex flex-col gap-12">
          <FieldSet>
            <FieldLegend>About</FieldLegend>
            <FieldDescription>
              This information will help you easily identify your property inside the platform.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input />
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Address</FieldLegend>
            <FieldDescription>asd</FieldDescription>

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
        </form>
      </div>
    </div>
  )
}
