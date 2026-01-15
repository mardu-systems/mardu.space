import { CheckCircle, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type SplitContentItem = {
  title: string;
  description: string | ReactNode;
  icon?: LucideIcon;
};

interface SplitContentProps {
  title: string;
  description: ReactNode;
  sideTitle?: string;
  sideIcon?: LucideIcon;
  items: SplitContentItem[];
  className?: string;
  reverse?: boolean;
}

export default function SplitContent({
  title,
  description,
  sideTitle,
  sideIcon: SideIcon = CheckCircle,
  items,
  className,
  reverse = false,
}: SplitContentProps) {
  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      <div
        className={cn(
          'grid gap-10 md:grid-cols-2 lg:gap-16 items-start',
          reverse && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
        )}
      >
        <div className={cn('space-y-6', reverse && 'md:order-2')}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-prose">
            {description}
          </div>
        </div>

        <Card className={cn('rounded-3xl overflow-hidden', reverse && 'md:order-1')}>
          {sideTitle && (
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-primary">
                <SideIcon className="text-primary w-5 h-5" aria-hidden="true" />
                {sideTitle}
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className="p-8 md:p-10">
            <ul className="space-y-6">
              {items.map((item, idx) => {
                const ItemIcon = item.icon ?? CheckCircle;

                return (
                  <li key={`${item.title}-${idx}`} className="flex gap-4 items-start">
                    <ItemIcon className="shrink-0 text-primary w-5 h-5 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-primary text-base md:text-lg">{item.title}</h4>
                      <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {typeof item.description === 'string' ? <p>{item.description}</p> : item.description}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
