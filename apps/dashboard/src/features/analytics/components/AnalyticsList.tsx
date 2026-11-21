import { useCallback, useEffect, useRef, useState } from 'react';

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

function getMaskImage(canScrollUp: boolean, canScrollDown: boolean): string {
  if (canScrollUp && canScrollDown) {
    return 'linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)';
  }
  if (canScrollDown) {
    return 'linear-gradient(to bottom, black calc(100% - 32px), transparent 100%)';
  }
  if (canScrollUp) {
    return 'linear-gradient(to bottom, transparent 0%, black 28px, black 100%)';
  }
  return 'none';
}

export function AnalyticsList({ items, emptyMessage = 'No data available' }: AnalyticsListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<{
    canScrollUp: boolean;
    canScrollDown: boolean;
  }>({ canScrollUp: false, canScrollDown: false });

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const hasOverflow = scrollHeight > clientHeight + 1;
    setScrollState({
      canScrollUp: hasOverflow && scrollTop > 4,
      canScrollDown: hasOverflow && scrollTop + clientHeight < scrollHeight - 4,
    });
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, checkScroll]);

  if (items.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const maskImage = getMaskImage(scrollState.canScrollUp, scrollState.canScrollDown);

  return (
    <div
      ref={scrollRef}
      onScroll={checkScroll}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      className="h-80 w-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
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
    </div>
  );
}

export function AnalyticsListSkeleton({ rows = 5 }: { rows?: number }) {
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
