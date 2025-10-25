"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface VerticalTimelineProps {
  items: {
    title: string
    description: string
    date: string
  }[]
  className?: string
}

export function VerticalTimeline({ items, className }: VerticalTimelineProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className="absolute left-1/2 top-0 w-1 -ml-0.5 bg-border rounded-full"
        style={{ scaleY, originY: 0, height: "100%" }}
      />
      <div className="relative flex flex-col gap-12">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "relative flex items-center",
              index % 2 === 0 ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "w-5/12",
                index % 2 === 0 ? "text-left" : "text-right"
              )}
            >
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="h-4 w-4 rounded-full bg-primary border-2 border-background" />
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md border border-card-border">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.description}</p>
                <time className="text-sm text-muted-foreground/80 mt-2 block">
                  {item.date}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
