import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AIShowcase from '@/components/AIShowcase';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '@shared/schema';

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillPill = ({ label, index }: { label: string; index: number }) => {
    const reduce = useReducedMotion();
    return (
      <motion.span
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.03 * index, type: 'spring', stiffness: 220, damping: 22 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm hover:shadow transition-shadow"
      >
        <span className="size-1.5 rounded-full bg-primary" />
        <span className="font-medium leading-none">{label}</span>
      </motion.span>
    );
  };

  const FloatingRow = ({ items }: { items: string[] }) => {
    const reduce = useReducedMotion();
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <motion.div
            key={t}
            animate={reduce ? {} : { y: [0, -6, 0] }}
            transition={reduce ? {} : { duration: 2 + (i % 5) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SkillPill label={t} index={i} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      data-testid="section-skills"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4" data-testid="text-skills-header">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in AI/ML with strong full-stack development capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Web Development Skills */}
          <Card className="p-8 hover-elevate">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2" data-testid="text-web-dev-header">
                Web Development
              </h3>
              <p className="text-muted-foreground">
                Full-stack tools and libraries I use daily
              </p>
            </div>
            <FloatingRow items={portfolioData.skills.web.map(s => s.name)} />
          </Card>

          {/* AI/ML Skills */}
          <Card className="p-8 hover-elevate">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2" data-testid="text-aiml-header">
                AI/ML & Data Science
              </h3>
              <p className="text-muted-foreground">
                ML/DL ecosystems, data tooling, and workflows
              </p>
            </div>
            <FloatingRow items={portfolioData.skills.aiml.map(s => s.name)} />
          </Card>
        </div>

        {/* AI + Web Dev Showcase */}
        <div className="mt-8">
          <AIShowcase />
        </div>
      </div>
    </section>
  );
}