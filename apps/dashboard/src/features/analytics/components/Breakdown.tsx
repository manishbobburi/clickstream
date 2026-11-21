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

import { useBreakdown } from '../hooks';
import type { BreakdownDimensionPreset } from '../types';
import { DIMENSION_LABELS } from '../breakdown';
import { AnalyticsList, AnalyticsListSkeleton, type AnalyticsListItem } from './AnalyticsList';

export function Breakdown() {
  const { data, isPending, isError, refetch, dimension, setDimension } = useBreakdown();

  if (isPending) {
    return <BreakdownSkeleton />;
  }

  if (isError) {
    return (
      <QueryError
        title="Unable to load breakdown"
        description="We couldn't load your dashboard metrics."
        onRetry={refetch}
      />
    );
  }

  const items: AnalyticsListItem[] = data.map((item) => ({
    key: item.label,
    label: item.label,
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Breakdown</CardTitle>
          <CardDescription>Events by selected dimension</CardDescription>
        </div>

        <DimensionSelect value={dimension} onChange={setDimension} />
      </CardHeader>

      <CardContent>
        <AnalyticsList items={items} emptyMessage="No breakdown data available" />
      </CardContent>
    </Card>
  );
}

function BreakdownSkeleton() {
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

interface DimensionProps {
  value: BreakdownDimensionPreset;
  onChange: (value: BreakdownDimensionPreset) => void;
}

function DimensionSelect({ value, onChange }: DimensionProps) {
  const items = Object.entries(DIMENSION_LABELS).map(([value, label]) => ({
    value: value as BreakdownDimensionPreset,
    label,
  }));

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value as BreakdownDimensionPreset);
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
