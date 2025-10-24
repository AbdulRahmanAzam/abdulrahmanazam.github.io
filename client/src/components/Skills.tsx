import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  const SkillBar = ({ name, proficiency, delay }: { name: string; proficiency: number; delay: number }) => (
    <div 
      className="space-y-2"
      style={{ 
        animation: isVisible ? `fade-in-up 0.6s ease-out ${delay}s forwards` : 'none',
        opacity: isVisible ? 1 : 0,
      }}
      data-testid={`skill-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-medium">{name}</span>
        <span className="font-mono text-sm text-muted-foreground">{proficiency}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${proficiency}%` : '0%',
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  );

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
                Full-stack development with modern frameworks
              </p>
            </div>
            <div className="space-y-4">
              {portfolioData.skills.web.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  proficiency={skill.proficiency}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Card>

          {/* AI/ML Skills */}
          <Card className="p-8 hover-elevate">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2" data-testid="text-aiml-header">
                AI/ML & Data Science
              </h3>
              <p className="text-muted-foreground">
                Machine learning, deep learning, and data analysis
              </p>
            </div>
            <div className="space-y-4">
              {portfolioData.skills.aiml.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  proficiency={skill.proficiency}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}