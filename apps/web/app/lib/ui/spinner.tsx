import { Circle, type LucideProps } from "lucide-react"
import { cn } from "~/lib/ui/utils"

const BLADES_BASE_CLASS =
  "[animation:spin_950ms_steps(8)_infinite] absolute size-full inset-0 [clip-path:polygon(50%_50%,_70%_0%,_30%_0%,_50%_50%)]"

const BLADES_CLASSES = [
  `${BLADES_BASE_CLASS} text-gray-a11 rotate-0`,
  `${BLADES_BASE_CLASS} text-gray-a10 rotate-45`,
  `${BLADES_BASE_CLASS} text-gray-a9 rotate-90`,
  `${BLADES_BASE_CLASS} text-gray-a8 rotate-135`,
  `${BLADES_BASE_CLASS} text-gray-a7 rotate-180`,
  `${BLADES_BASE_CLASS} text-gray-a6 rotate-225`,
  `${BLADES_BASE_CLASS} text-gray-a5 rotate-270`,
  `${BLADES_BASE_CLASS} text-gray-a4 rotate-315`,
]

type SpinnerProps = LucideProps

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div className={cn("relative size-4 overflow-hidden", className)}>
      {Array.from({ length: BLADES_CLASSES.length }).map((_, index) => {
        return (
          <Circle
            key={index}
            role="status"
            aria-label="Loading"
            className={BLADES_CLASSES[index]}
            {...props}
          />
        )
      })}
    </div>
  )
}

export { Spinner }
export type { SpinnerProps }
