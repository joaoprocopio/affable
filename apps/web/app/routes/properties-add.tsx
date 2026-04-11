import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import { Field, FieldGroup, FieldLabel } from "~/lib/ui/field"
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

      <div className="mx-auto max-w-2xl px-6 py-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Property name</FieldLabel>
            <Input />
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea />
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}
