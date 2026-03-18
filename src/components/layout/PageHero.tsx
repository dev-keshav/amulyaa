import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeroStat = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  stats?: HeroStat[];
  aside?: ReactNode;
  centered?: boolean;
  compact?: boolean;
  className?: string;
};

const PageHero = ({
  eyebrow,
  title,
  description,
  actions,
  stats,
  aside,
  centered = false,
  compact = false,
  className,
}: PageHeroProps) => {
  const contentClassName = aside
    ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:items-center'
    : centered
      ? 'mx-auto max-w-3xl justify-items-center text-center'
      : 'max-w-3xl';

  return (
    <section className={cn('relative', className)}>
      <div
        className={cn(
          'container px-4',
          compact ? 'pb-10 pt-8 md:pb-12 md:pt-10' : 'pb-14 pt-10 md:pb-16 md:pt-12',
        )}
      >
        <div className="surface-panel px-6 py-8 md:px-10 md:py-12">
          <div className={cn('relative grid gap-10', contentClassName)}>
            <div className={cn('relative', centered && !aside && 'flex flex-col items-center')}>
              {eyebrow && <p className="section-kicker">{eyebrow}</p>}
              <h1 className="mt-4 font-serif text-5xl font-semibold text-foreground sm:text-6xl">
                {title}
              </h1>
              {description && (
                <p className={cn('section-copy mt-5', centered && !aside && 'text-center')}>
                  {description}
                </p>
              )}
              {actions && (
                <div className={cn('mt-8 flex flex-wrap gap-3', centered && !aside && 'justify-center')}>
                  {actions}
                </div>
              )}
              {stats && stats.length > 0 && (
                <div className={cn('mt-8 grid gap-3 sm:grid-cols-3', centered && !aside && 'w-full')}>
                  {stats.map((stat) => (
                    <div key={stat.label} className="surface-panel-muted p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-3 font-serif text-3xl text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {aside && <div className="relative">{aside}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
