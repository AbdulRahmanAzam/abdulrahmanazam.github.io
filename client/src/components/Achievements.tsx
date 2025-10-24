import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { portfolioData } from '@shared/schema';
import { Code2, Trophy, Award, Sparkles } from 'lucide-react';

const iconMap = {
  code: Code2,
  trophy: Trophy,
  certificate: Award,
  sparkles: Sparkles,
};

export function Achievements() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers = new Map();

    portfolioData.achievements.forEach((achievement) => {
      const element = cardRefs.current.get(achievement.id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => new Set([...prev, achievement.id]));
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(element);
        observers.set(achievement.id, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section 
      id="achievements" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      data-testid="section-achievements"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4" data-testid="text-achievements-header">
            Achievements & Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition and certifications earned through continuous learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Award;
            const isVisible = visibleCards.has(achievement.id);

            return (
              <div
                key={achievement.id}
                ref={(el) => el && cardRefs.current.set(achievement.id, el)}
                data-testid={`achievement-${achievement.id}`}
              >
                <Card 
                  className={`p-6 h-full hover-elevate active-elevate-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2" data-testid={`text-achievement-title-${achievement.id}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`text-achievement-description-${achievement.id}`}>
                        {achievement.description}
                      </p>
                    </div>
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