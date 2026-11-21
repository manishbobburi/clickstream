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

import { useTopEvents } from '../hooks';
import type { TopEventsPreset } from '../types';
import { TOP_EVENTS_LABELS } from '../top-events';
import { AnalyticsList, AnalyticsListSkeleton, type AnalyticsListItem } from './AnalyticsList';

export function TopEvents() {
  const { data, isPending, isError, refetch, events_top, setTopEventsParams } = useTopEvents();

  if (isPending) {
    return <TopEventsSkeleton />;
  }

  if (isError) {
    return (
      <QueryError
        title="Unable to load top events"
        description="We couldn't load your dashboard metrics."
        onRetry={refetch}
      />
    );
  }

  const items: AnalyticsListItem[] = data.topEvents.map((item) => ({
    key: item.event,
    label: item.event,
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Events</CardTitle>
          <CardDescription>Total events: {formatCompactNumber(data.totalEvents)}</CardDescription>
        </div>

        <TopKSelect value={events_top} onChange={setTopEventsParams} />
      </CardHeader>

      <CardContent>
        <AnalyticsList items={items} emptyMessage="No events recorded" />
      </CardContent>
    </Card>
  );
}

interface TopKSelectProps {
  value: TopEventsPreset;
  onChange: (value: TopEventsPreset) => void;
}

function TopKSelect({ value, onChange }: TopKSelectProps) {
  const items = Object.entries(TOP_EVENTS_LABELS).map(([value, label]) => ({
    value: value as TopEventsPreset,
    label,
  }));
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value as TopEventsPreset);
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

function TopEventsSkeleton() {
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
