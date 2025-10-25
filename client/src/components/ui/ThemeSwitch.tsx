"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/hooks/use-dark-mode"

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useDarkMode()

  return (
    <SwitchPrimitives.Root
      className={cn(
        "relative inline-flex h-7 w-14 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      ref={ref}
    >
      <Sun className="absolute left-2 h-4 w-4 text-foreground transition-opacity" />
      <Moon className="absolute right-2 h-4 w-4 text-foreground transition-opacity" />
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none absolute left-0 inline-block h-6 w-6 transform rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
          isDarkMode && "bg-primary"
        )}
      >
        <Sun className="absolute inset-0 m-auto h-4 w-4 text-primary-foreground opacity-0 transition-opacity data-[state=unchecked]:opacity-100" />
        <Moon className="absolute inset-0 m-auto h-4 w-4 text-primary-foreground opacity-0 transition-opacity data-[state=checked]:opacity-100" />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
})
ThemeSwitch.displayName = "ThemeSwitch"

export { ThemeSwitch }
