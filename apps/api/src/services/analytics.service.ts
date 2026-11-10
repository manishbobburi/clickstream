import { analyticsRepository } from '@click-stream/db';
import {
  OverviewQuery,
  OverviewFilters,
  OverviewResponse,
  EventTrendQuery,
  TrendInterval,
  EventTrendResponse,
  BreakdownQuery,
  BreakdownResponse,
  TopEventsQuery,
  TopEventsResponse,
  TopEvent,
  TopPagesQuery,
  TopPagesResponse,
  TopPage,
} from '@click-stream/shared';

async function getOverview(orgId: string, query: OverviewQuery): Promise<OverviewResponse> {
  const { from, to } = query;

  const filters: OverviewFilters = {
    orgId,
    from,
    to,
  };

  const overview = await analyticsRepository.getOverview(filters);

  return overview;
}

async function getEventTrend(query: EventTrendQuery): Promise<EventTrendResponse> {
  const trend = await analyticsRepository.getEventTrend(query);

  const counts = new Map(trend.map((t) => [t.period.toISOString(), Number(t.events)]));

  const result: EventTrendResponse = [];

  let cursor = floorToInterval(query.from, query.interval);

  while (cursor <= query.to) {
    const key = cursor.toISOString();

    result.push({
      period: key,
      events: counts.get(key) ?? 0,
    });

    cursor = addInterval(cursor, query.interval);
  }

  return result;
}

async function getBreakdown(query: BreakdownQuery): Promise<BreakdownResponse> {
  const rows = await analyticsRepository.getBreakdown(query);

  return rows.map((row) => ({
    label: row.label ?? 'Unknown',
    count: Number(row.count),
  }));
}

async function getTopEvents(query: TopEventsQuery): Promise<TopEventsResponse> {
  const [rows, totalEvents] = await Promise.all([
    analyticsRepository.getTopEvents(query),
    analyticsRepository.getTotalEvents({
      orgId: query.orgId,
      from: query.from,
      to: query.to,
    }),
  ]);

  const topEvents: TopEvent[] = rows.map((e) => {
    const count = Number(e.count);

    return {
      event: e.event,
      count,
      percentage: totalEvents === 0 ? 0 : Number(((count / totalEvents) * 100).toFixed(2)),
    };
  });

  return {
    totalEvents,
    topEvents,
  };
}

async function getTopPages(query: TopPagesQuery): Promise<TopPagesResponse> {
  const [records, totalPageViews] = await Promise.all([
    analyticsRepository.getTopPages(query),
    analyticsRepository.getTotalPageViews(query),
  ]);

  const topPages: TopPage[] = records.map((e) => {
    const count = Number(e.count);

    return {
      page: e.page,
      count,
      percentage: totalPageViews === 0 ? 0 : Number(((count / totalPageViews) * 100).toFixed(2)),
    };
  });

  return {
    totalPageViews,
    topPages,
  };
}

function addInterval(date: Date, interval: TrendInterval): Date {
  const next = new Date(date);

  switch (interval) {
    case 'hour':
      next.setUTCHours(next.getUTCHours() + 1);
      break;
    case 'day':
      next.setUTCDate(next.getUTCDate() + 1);
      break;
    case 'week':
      next.setUTCDate(next.getUTCDate() + 7);
      break;
    case 'month':
      next.setUTCMonth(next.getUTCMonth() + 1);
      break;
  }

  return next;
}

function floorToInterval(date: Date, interval: TrendInterval): Date {
  const result = new Date(date);

  switch (interval) {
    case 'hour':
      result.setUTCMinutes(0, 0, 0);
      break;
    case 'day':
      result.setUTCHours(0, 0, 0);
      break;
    case 'week': {
      result.setUTCHours(0, 0, 0, 0);

      const day = result.getUTCDay();
      const diff = day === 0 ? -6 : 1 - day;

      result.setUTCDate(result.getUTCDate() + diff);
      break;
    }
    case 'month': {
      result.setUTCHours(0, 0, 0, 0);
      result.setUTCDate(1);
      break;
    }
  }

  return result;
}

export { getOverview, getEventTrend, getBreakdown, getTopEvents, getTopPages };
