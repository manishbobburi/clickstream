import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/common/Logo';
import { useScrollSpy } from '@/hooks/use-scrollspy';

export interface NavSubItem {
  title: string;
  id: string;
}

export interface NavMainItem {
  title: string;
  id: string;
  items?: NavSubItem[];
}

export const data: { navMain: NavMainItem[] } = {
  navMain: [
    {
      title: 'Overview',
      id: 'overview',
      items: [
        { title: 'Introduction', id: 'introduction' },
        { title: 'Architecture', id: 'architecture' },
        { title: 'Features', id: 'features' },
      ],
    },
    {
      title: 'Getting Started',
      id: 'getting-started',
      items: [
        { title: 'Prerequisites', id: 'prerequisites' },
        { title: 'Installation', id: 'installation' },
        { title: 'Quick Start', id: 'quick-start' },
      ],
    },
    {
      title: 'Core Concepts',
      id: 'core-concepts',
      items: [
        { title: 'Event Tracking', id: 'concept-event-tracking' },
        { title: 'User Identification', id: 'concept-identity' },
        { title: 'Sessions & Storage', id: 'concept-sessions' },
        { title: 'Auto Context', id: 'concept-context-collection' },
        { title: 'Consent & Privacy', id: 'concept-consent' },
      ],
    },
    {
      title: 'Frameworks',
      id: 'framework-guides',
      items: [
        { title: 'React', id: 'framework-react' },
        { title: 'Next.js', id: 'framework-nextjs' },
        { title: 'Vue / Nuxt', id: 'framework-vue' },
        { title: 'Vanilla JS', id: 'framework-vanilla' },
      ],
    },
    {
      title: 'Configuration',
      id: 'configuration',
      items: [
        { title: 'Options', id: 'config-options' },
        { title: 'Security & HTTPS', id: 'config-security' },
        { title: 'Debugging', id: 'config-debug' },
      ],
    },
    {
      title: 'API Reference',
      id: 'api-reference',
      items: [
        { title: 'init()', id: 'api-init' },
        { title: 'track()', id: 'api-track' },
        { title: 'identify()', id: 'api-identify' },
        { title: 'page()', id: 'api-page' },
        { title: 'consent()', id: 'api-consent' },
        { title: 'flush()', id: 'api-flush' },
        { title: 'destroy()', id: 'api-destroy' },
        { title: 'Custom Instances', id: 'api-custom-instances' },
      ],
    },
    {
      title: 'Reliability',
      id: 'reliability-delivery',
      items: [
        { title: 'Batching & Queue', id: 'delivery-queue-batching' },
        { title: 'Page Exit (Beacon)', id: 'delivery-sendbeacon' },
        { title: 'Retries & Backoff', id: 'delivery-retries' },
        { title: 'Storage Fallbacks', id: 'delivery-storage-fallback' },
      ],
    },
    {
      title: 'Payload Schema',
      id: 'ingestion-payload',
      items: [
        { title: 'Endpoint Schema', id: 'payload-http-schema' },
        { title: 'Event Fields', id: 'payload-event-fields' },
        { title: 'TypeScript Types', id: 'payload-typescript-types' },
      ],
    },
  ],
};

export function DocumentationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const allIds = React.useMemo(() => {
    return data.navMain.flatMap((item) => [item.id, ...(item.items?.map((sub) => sub.id) ?? [])]);
  }, []);

  const activeId = useScrollSpy(allIds, 120);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-14 flex justify-center border-b border-border/40 px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="/docs" />}>
              <div className="flex size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Logo />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="truncate text-lg font-semibold group-data-[collapsible=icon]:hidden">
                  Documentation
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isSectionActive =
                item.id === activeId || item.items?.some((sub) => sub.id === activeId);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.id === activeId}
                    render={
                      <a
                        href={`#${item.id}`}
                        onClick={() => history.replaceState(null, '', `#${item.id}`)}
                      />
                    }
                  >
                    <span className={isSectionActive ? 'font-medium text-foreground' : ''}>
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={subItem.id === activeId}
                            render={
                              <a
                                href={`#${subItem.id}`}
                                onClick={() => history.replaceState(null, '', `#${subItem.id}`)}
                              />
                            }
                          >
                            {subItem.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
