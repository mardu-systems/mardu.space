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
          'grid md:grid-cols-2 gap-12 lg:gap-20 items-center',
          reverse && 'md:flex-row-reverse',
        )}
      >
        <div className={cn(reverse && 'md:order-2')}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">{title}</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            {description}
          </div>
        </div>

        {/* Card already implies bg-card, border, shadow-sm. 
            We just add rounded-[24px] to match the requested rounding style. */}
        <Card className={cn('rounded-3xl overflow-hidden', reverse && 'md:order-1')}>
          {sideTitle && (
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-primary">
                <SideIcon className="text-green-600 w-6 h-6" />
                {sideTitle}
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className="px-8 py-8">
            <ul className="space-y-8">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  {item.icon && <item.icon className="shrink-0 text-primary w-6 h-6 mt-0.5" />}
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {typeof item.description === 'string' ? (
                        <p>{item.description}</p>
                      ) : (
                        item.description
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
