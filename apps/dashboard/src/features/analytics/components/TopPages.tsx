import { Skeleton } from '@/components/ui/skeleton';
import { QueryError } from '@/components/common/QueryError';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCompactNumber } from '@/lib/utils';

import { useTopPages } from '../hooks';
import type { TopPagesPreset } from '../types';
import { TOP_PAGES_LABELS } from '../top-pages';
import { AnalyticsList, AnalyticsListSkeleton, type AnalyticsListItem } from './AnalyticsList';

export function TopPages() {
  const { data, isPending, isError, refetch, k, setK } = useTopPages();

  if (isPending) {
    return <TopPagesSkeleton />;
  }

  if (isError) {
    return <QueryError onRetry={refetch} />;
  }

  const items: AnalyticsListItem[] = data.topPages.map((item) => ({
    key: item.page,
    label: item.page || '/',
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Page Views</CardTitle>
          <CardDescription>
            Total page views: {formatCompactNumber(data.totalPageViews)}
          </CardDescription>
        </div>

        <TopKSelect value={k} onChange={setK} />
      </CardHeader>

      <CardContent>
        <AnalyticsList items={items} emptyMessage="No page views recorded" />
      </CardContent>
    </Card>
  );
}

interface TopKSelectProps {
  value: TopPagesPreset;
  onChange: (value: TopPagesPreset) => void;
}

function TopKSelect({ value, onChange }: TopKSelectProps) {
  const items = Object.entries(TOP_PAGES_LABELS).map(([value, label]) => ({
    value: value as TopPagesPreset,
    label,
  }));
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value as TopPagesPreset);
      }}
      items={items}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TopPagesSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-9 w-20" />
      </CardHeader>

      <CardContent>
        <AnalyticsListSkeleton />
      </CardContent>
    </Card>
  );
}
