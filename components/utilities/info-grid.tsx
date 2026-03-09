import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Overline } from '@/components/ui/typography';

export type InfoGridItem = {
  title: string;
  icon?: LucideIcon;
  features: {
    label: string;
    description: string | ReactNode;
  }[];
};

interface InfoGridProps {
  title?: string;
  eyebrow?: string;
  items: InfoGridItem[];
  columns?: number;
  className?: string;
}

export default function InfoGrid({
  title,
  eyebrow,
  items,
  columns = 4,
  className,
}: InfoGridProps) {
  const gridCols =
    {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
      {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
      {title && (
        <h2 className="headline-balance mb-12 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
      )}
      <div className={`grid gap-8 lg:gap-12 ${gridCols}`}>
        {items.map((item, idx) => (
          <Card key={idx} className="border border-black/10 bg-card shadow-none">
            <CardHeader className="mb-2 border-b border-black/8 px-6 pt-6">
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="h-6 w-6 text-foreground/70" />}
                <CardTitle className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ul className="space-y-6">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="space-y-1">
                    <strong className="block text-sm font-semibold uppercase tracking-[0.14em] text-foreground/55">
                      {feature.label}
                    </strong>
                    <div className="text-[15px] leading-relaxed text-foreground/72">
                      {typeof feature.description === 'string' ? (
                        <span>{feature.description}</span>
                      ) : (
                        feature.description
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  );
}
