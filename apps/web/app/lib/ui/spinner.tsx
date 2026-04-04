import { Loader } from "lucide-react"
import { cn } from "~/lib/ui/utils"

const BLADES_BASE_CLASS =
  "[animation:spin_950ms_steps(8)_infinite] absolute size-full inset-0 [clip-path:polygon(50%_50%,_70%_0%,_30%_0%,_50%_50%)]"

const BLADES_CLASSES = [
  `${BLADES_BASE_CLASS} text-gray-a10 rotate-0`,
  `${BLADES_BASE_CLASS} text-gray-a9 rotate-45`,
  `${BLADES_BASE_CLASS} text-gray-a7 rotate-90`,
  `${BLADES_BASE_CLASS} text-gray-a4 rotate-135`,
  `${BLADES_BASE_CLASS} text-gray-a3 rotate-180`,
  `${BLADES_BASE_CLASS} text-gray-a2 rotate-225`,
  `${BLADES_BASE_CLASS} text-gray-a2 rotate-270`,
  `${BLADES_BASE_CLASS} text-gray-a1 rotate-315`,
]

const BLADES = Array.from({ length: BLADES_CLASSES.length }).map((_, index) => {
  return <Loader key={index} role="status" aria-label="Loading" className={BLADES_CLASSES[index]} />
})

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div className={cn("relative size-4.5 overflow-hidden", className)} {...props}>
        {BLADES}
      </div>
    </div>
  )
}

export { Spinner }
