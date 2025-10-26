import React, { useRef, memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '@shared/schema';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

// Vertical lift per card as they stack (in px). Lower = tighter stack.
const STACK_OFFSET_PER_CARD = 60;

// Tune spring for quicker response and less oscillation (reduces perceived lag)
const SPRING_CONFIG = { stiffness: 120, damping: 30, mass: 0.3 };

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      data-testid="section-projects"
    >
      <div className="max-w-6xl mx-auto">
        <ProjectsStack />
      </div>
    </section>
  );
}

const ProjectsStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  // Use spring for smoother, more responsive scroll-linked animations
  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  const projects = portfolioData.projects;
  const totalProjects = projects.length;
  const step = 1 / Math.max(1, totalProjects); // progress step per item

  return (
    <main
      ref={containerRef}
      className="relative flex w-full flex-col items-center gap-8 pb-[12vh]"
    >
      <div className="sticky top-0 sm:top-24 z-[2000] flex flex-col items-center justify-center gap-4 text-center pointer-events-none pb-20">
        <h2
          className="text-4xl sm:text-5xl font-semibold tracking-tight"
          data-testid="text-projects-header"
        >
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A selection of my best work in AI/ML and full-stack development
        </p>
      </div>

      {projects.map((project, i) => {
        const depth = Math.max(1, totalProjects - i - 1);
        const targetScale = Math.max(0.7, 1 - depth * 0.08);
        const range: [number, number] = [i * step, 1];
        return (
          <StickyProjectCard
            key={project.id}
            i={i}
            title={project.title}
            period={project.period}
            description={project.description}
            technologies={[...project.technologies] as string[]}
            highlights={[...project.highlights] as string[]}
            total={totalProjects}
            lift={depth}
            progress={smoothProgress}
            range={range}
            targetScale={targetScale}
          />
        );
      })}

      {/* Spacer to ensure the last card reaches its sticky target before container ends */}
      <div aria-hidden style={{ height: `${STACK_OFFSET_PER_CARD * Math.max(1, totalProjects - 1) + 120}px` }} />
    </main>
  );
};

type StickyProps = {
  i: number;
  total: number;
  lift: number;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

const StickyProjectCard = memo(function StickyProjectCard({
  i,
  total,
  lift,
  title,
  period,
  description,
  technologies,
  highlights,
  progress,
  range,
  targetScale,
}: StickyProps) {
  // Use eased transforms for smoother interpolation (reduces jerkiness)
  const scale = useTransform(progress, range, [1.02, targetScale]);
  const translateY = useTransform(progress, range, [0, -lift * STACK_OFFSET_PER_CARD]);
  const zIndex = total + i;

  return (
    <motion.article
      className="sticky top-[28vh] flex w-full max-w-4xl origin-top px-4 sm:px-6"
      style={{
        scale,
        y: translateY,
        zIndex,
        willChange: 'transform', // Hint to browser for GPU acceleration, improves performance
      }}
    >
      <Card className="relative flex min-h-[26rem] w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-8 shadow-xl shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-card md:p-10">
        <div className="flex flex-1 flex-col gap-6">
          <header className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{title}</h3>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground/70">{period}</p>
              </div>
            </div>
          </header>

          <p className="text-base leading-relaxed text-muted-foreground/90">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-[11px] tracking-wide">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                <span className="mt-1 text-primary">▸</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/5 via-primary/0 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/20 via-background/0 to-transparent" />
      </Card>
    </motion.article>
  );
});