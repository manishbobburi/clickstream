import { AppWindow, BarChart3, Layers, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Stage {
  step: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const STAGES: Stage[] = [
  {
    step: '01',
    title: 'Your App',
    subtitle: 'Browser',
    icon: AppWindow,
    items: ['track()', 'page()', 'identify()'],
  },
  {
    step: '02',
    title: '@click-stream/sdk',
    subtitle: 'Client Buffer',
    icon: Layers,
    items: ['Session & anon_id', 'Auto browser context', 'FIFO queue (batch 10 / 3s)'],
  },
  {
    step: '03',
    title: 'Transport',
    subtitle: 'Resilient Delivery',
    icon: Send,
    items: ['POST /api/v1/events', 'Exponential retry backoff', 'sendBeacon on page exit'],
  },
  {
    step: '04',
    title: 'ClickStream Cloud',
    subtitle: 'Ingestion & Dashboard',
    icon: BarChart3,
    items: ['write_key authentication', 'PostgreSQL event store', 'Real-time dashboard UI'],
  },
];

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <Card
      size="sm"
      className={cn(
        'w-full max-w-4xl bg-code/40 border border-border ring-0 shadow-none my-4',
        className
      )}
    >
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          return (
            <Card
              key={stage.step}
              size="sm"
              className="bg-sidebar border border-border ring-0 shadow-none min-w-0 gap-3"
            >
              <CardHeader className="gap-x-3 gap-y-0.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="leading-tight">{stage.title}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">{stage.subtitle}</CardDescription>
                  </div>
                </div>

                <CardAction>
                  <Badge
                    variant="outline"
                    className="rounded px-1.5 text-[11px] text-muted-foreground"
                  >
                    {stage.step}
                  </Badge>
                </CardAction>
              </CardHeader>

              <div className="px-4">
                <Separator className="bg-border/70" />
              </div>

              <CardContent>
                <ul className="space-y-1.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-muted-foreground leading-relaxed"
                    >
                      <span className="size-1 rounded-full bg-muted-foreground/60 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
