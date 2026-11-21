import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCompactNumber } from '@/lib/utils';

export interface AnalyticsListItem {
  key?: string;
  label: string;
  count: number;
}

interface AnalyticsListProps {
  items: AnalyticsListItem[];
  emptyMessage?: string;
}

export function AnalyticsList({ items, emptyMessage = 'No data available' }: AnalyticsListProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const isScrollable = items.length > 10;

  const listContent = (
    <div className="flex w-full flex-col">
      {items.map((item, index) => (
        <div
          key={item.key ?? `${item.label}-${index}`}
          className="flex w-full items-center justify-between gap-4 border-b border-border/40 py-2.5 transition-colors hover:bg-muted/30 last:border-b-0"
        >
          <span
            className="min-w-0 flex-1 truncate text-sm font-normal text-muted-foreground"
            title={item.label}
          >
            {item.label}
          </span>
          <span className="shrink-0 text-right text-sm font-medium tabular-nums whitespace-nowrap text-foreground/90">
            {formatCompactNumber(item.count)}
          </span>
        </div>
      ))}
    </div>
  );

  if (isScrollable) {
    return <ScrollArea className="h-80 w-full overflow-x-hidden pr-3">{listContent}</ScrollArea>;
  }

  return <div className="h-80 w-full overflow-hidden">{listContent}</div>;
}

export function AnalyticsListSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="flex h-80 w-full flex-col">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between gap-4 border-b border-border/40 py-2.5 last:border-b-0"
        >
          <Skeleton className="h-4 w-32 sm:w-44" />
          <Skeleton className="h-4 w-12 shrink-0" />
        </div>
      ))}
    </div>
  );
}
