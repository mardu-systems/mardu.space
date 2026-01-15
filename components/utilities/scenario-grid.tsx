import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type ScenarioBlock = {
  title: string;
  description: string | ReactNode;
};

export type ScenarioHighlight = {
  title: string;
  description: string | ReactNode;
};

interface ScenarioGridProps {
  title: string;
  leftTitle: string;
  leftBlocks: ScenarioBlock[];
  rightHighlights: ScenarioHighlight[];
  className?: string;
}

export default function ScenarioGrid({
  title,
  leftTitle,
  leftBlocks,
  rightHighlights,
  className,
}: ScenarioGridProps) {
  return (
    <section className={cn(' py-20 px-6 md:px-8 w-full', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Grouped Card */}
          {/* Default Card has bg-card, border, shadow-sm. We remove border and custom radius. */}
          <Card className="border-none rounded-3xl overflow-hidden">
            <CardHeader className="py-6">
              <CardTitle className="text-2xl font-bold text-primary">{leftTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8">
              {leftBlocks.map((block, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-bold text-primary text-lg">{block.title}</h4>
                  <div className="text-muted-foreground leading-relaxed">
                    {typeof block.description === 'string' ? (
                      <p>{block.description}</p>
                    ) : (
                      block.description
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column: Individual Highlight Cards */}
          <div className="space-y-6">
            {rightHighlights.map((highlight, idx) => (
              // Default Card has bg-card, shadow-sm. We override border to be left-only.
              <Card
                key={idx}
                className="border-l-[6px] border-l-primary border-y-0 border-r-0 rounded-l-none rounded-r-[20px] transition-transform duration-300 hover:translate-x-1"
              >
                <CardContent className="py-4 px-8">
                  <h4 className="font-bold text-xl mb-3 text-primary">{highlight.title}</h4>
                  <div className="text-muted-foreground leading-relaxed">
                    {typeof highlight.description === 'string' ? (
                      <p>{highlight.description}</p>
                    ) : (
                      highlight.description
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
