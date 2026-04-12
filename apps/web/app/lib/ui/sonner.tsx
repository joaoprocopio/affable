import { CheckIcon, CircleCheckIcon, CircleSlash, InfoIcon, TriangleAlertIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { Spinner } from "~/lib/ui/spinner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans!"
      icons={{
        success: <CircleCheckIcon className="size-full" />,
        info: <InfoIcon className="size-full" />,
        warning: <TriangleAlertIcon className="size-full" />,
        error: <CircleSlash className="size-full" />,
        loading: <Spinner className="size-full" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "gap-3.5!",
          title: "text-xs",
          description: "text-xs",
          loader: "size-5! m-0!",
          icon: "size-5! m-0! text-muted-foreground!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
