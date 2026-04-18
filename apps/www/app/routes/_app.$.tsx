import { NotepadTextDashed } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/lib/ui/empty"

export default function NotFoundRoute() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotepadTextDashed />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>Not found</EmptyTitle>
      <EmptyDescription className="max-w-xs">
        We could not find the page you were looking for
      </EmptyDescription>
    </Empty>
  )
}
