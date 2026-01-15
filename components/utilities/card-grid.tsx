import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type CardItem = {
  title: string;
  description: string | ReactNode;
  icon?: LucideIcon;
  badge?: string;
  list?: string[];
  className?: string;
};

interface CardGridProps {
  title?: string;
  items: CardItem[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'outline' | 'muted';
  className?: string;
}

export default function CardGrid({
  title,
  items,
  columns = 3,
  variant = 'default',
  className,
}: CardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
          {title}
        </h2>
      )}
      <div className={cn('grid gap-8 items-stretch', gridCols)}>
        {items.map((item, idx) => (
          <Card
            key={`${item.title}-${idx}`}
            className={cn(
              'rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-md h-full',
              // Default variant relies on Card's default styles (bg-card, border, shadow-sm)

              // Outline variant: semi-transparent background, standard border
              variant === 'outline' && 'bg-card/50 shadow-none',

              // Muted variant: No border, muted background, no shadow
              variant === 'muted' && 'bg-muted border-none shadow-none',

              item.className,
            )}
          >
            <CardHeader className="relative p-8 pb-4">
              {item.badge && (
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 border-0 rounded-full px-3 py-1"
                  >
                    {item.badge}
                  </Badge>
                </div>
              )}
              {item.icon && (
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="text-primary w-6 h-6" aria-hidden="true" />
                </div>
              )}
              <CardTitle className="text-lg md:text-xl font-semibold leading-tight text-primary">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {typeof item.description === 'string' ? (
                  <p>{item.description}</p>
                ) : (
                  item.description
                )}
              </div>
              {item.list && (
                <ul className="mt-5 space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside">
                  {item.list.map((li, lIdx) => (
                    <li key={lIdx}>{li}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
