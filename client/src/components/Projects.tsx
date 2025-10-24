import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '@shared/schema';
import { ExternalLink, Code2 } from 'lucide-react';

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers = new Map();

    portfolioData.projects.forEach((project) => {
      const element = projectRefs.current.get(project.id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleProjects(prev => new Set([...prev, project.id]));
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(element);
        observers.set(project.id, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      data-testid="section-projects"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4" data-testid="text-projects-header">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my best work in AI/ML and full-stack development
          </p>
        </div>

        <div className="space-y-8">
          {portfolioData.projects.map((project, index) => {
            const isVisible = visibleProjects.has(project.id);
            const isFullWidth = index === 0 || index === 3;

            return (
              <div
                key={project.id}
                ref={(el) => el && projectRefs.current.set(project.id, el)}
                className={`${isFullWidth ? 'w-full' : 'w-full'}`}
                data-testid={`project-${project.id}`}
              >
                <Card 
                  className={`p-8 hover-elevate active-elevate-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Code2 className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </h3>
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">{project.period}</p>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed mb-6" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="font-mono text-xs"
                        data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        data-testid={`text-highlight-${idx}`}
                      >
                        <span className="text-primary mt-1">▸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}