import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import { Field } from "~/lib/ui/field"
import { Input } from "~/lib/ui/input"

export const handle: Handle = {
  breadcrumb: "Add",
}

export default function PropertiesAddRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderBreadcrumb />
      </AppHeader>

      <div className="px-6 py-4">
        <Field>
          <Input placeholder="Insert your property name..." />
        </Field>
      </div>
    </div>
  )
}
