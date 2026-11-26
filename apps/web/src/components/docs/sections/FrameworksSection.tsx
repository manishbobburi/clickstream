import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCallout,
  DocCodeBlock,
} from '@/components/docs/DocumentationComponents';

export function FrameworksSection() {
  return (
    <DocSection
      id="framework-guides"
      title="Frameworks"
      description="Drop-in integration patterns for React, Next.js, Vue / Nuxt, and plain JavaScript applications."
    >
      <DocSubSection id="framework-react" title="React">
        <DocParagraph>
          Initialize the SDK once at your application&apos;s entry point (for example, in{' '}
          <DocInlineCode>main.tsx</DocInlineCode>) so it isn&apos;t re-initialized across component
          re-renders. To track client-side route transitions automatically, pair a small route
          listener with React Router&apos;s <DocInlineCode>useLocation</DocInlineCode> hook.
        </DocParagraph>

        <DocCodeBlock
          filename="src/main.tsx"
          code={`import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import clickStream from '@click-stream/sdk';
import App from './App';

clickStream.init({
  writeKey: import.meta.env.VITE_CLICKSTREAM_WRITE_KEY,
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
});

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    clickStream.page(document.title, {
      path: location.pathname,
      search: location.search,
    });
  }, [location.pathname, location.search]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
);`}
        />

        <DocParagraph>
          Inside any component, call <DocInlineCode>clickStream.track()</DocInlineCode> directly in
          event handlers to capture user interactions:
        </DocParagraph>

        <DocCodeBlock
          filename="src/components/UpgradeButton.tsx"
          code={`import clickStream from '@click-stream/sdk';

export function UpgradeButton() {
  const handleUpgrade = () => {
    clickStream.track('upgrade_clicked', {
      plan: 'pro',
      location: 'billing_banner',
    });
  };

  return <button onClick={handleUpgrade}>Upgrade to Pro</button>;
}`}
        />
      </DocSubSection>

      <DocSubSection id="framework-nextjs" title="Next.js">
        <DocParagraph>
          Because <DocInlineCode>@click-stream/sdk</DocInlineCode> relies on browser APIs (
          <DocInlineCode>window</DocInlineCode>, <DocInlineCode>localStorage</DocInlineCode>, and{' '}
          <DocInlineCode>navigator.sendBeacon</DocInlineCode>), initialize and invoke it inside a
          Client Component (<DocInlineCode>&apos;use client&apos;</DocInlineCode>) when using the
          Next.js App Router.
        </DocParagraph>

        <DocCodeBlock
          filename="app/providers/AnalyticsProvider.tsx"
          code={`'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import clickStream from '@click-stream/sdk';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      clickStream.init({
        writeKey: process.env.NEXT_PUBLIC_CLICKSTREAM_WRITE_KEY!,
        apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
      });
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) return;

    clickStream.page(document.title, {
      path: pathname,
      query: searchParams.toString() || undefined,
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}`}
        />

        <DocParagraph>
          Wrap your root layout with <DocInlineCode>AnalyticsProvider</DocInlineCode> inside a{' '}
          <DocInlineCode>&lt;Suspense&gt;</DocInlineCode> boundary (required by Next.js when reading{' '}
          <DocInlineCode>useSearchParams</DocInlineCode>):
        </DocParagraph>

        <DocCodeBlock
          filename="app/layout.tsx"
          code={`import { Suspense } from 'react';
import { AnalyticsProvider } from './providers/AnalyticsProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}`}
        />
      </DocSubSection>

      <DocSubSection id="framework-vue" title="Vue / Nuxt">
        <DocParagraph>
          In Vue 3 with Vue Router, initialize the SDK in <DocInlineCode>main.ts</DocInlineCode> and
          register a <DocInlineCode>router.afterEach</DocInlineCode> hook to record every route
          change automatically.
        </DocParagraph>

        <DocCodeBlock
          filename="src/main.ts"
          code={`import { createApp } from 'vue';
import clickStream from '@click-stream/sdk';
import App from './App.vue';
import router from './router';

clickStream.init({
  writeKey: import.meta.env.VITE_CLICKSTREAM_WRITE_KEY,
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
});

router.afterEach((to) => {
  clickStream.page(to.meta.title as string | undefined, {
    path: to.fullPath,
    route_name: String(to.name ?? ''),
  });
});

createApp(App).use(router).mount('#app');`}
        />

        <DocParagraph>
          For Nuxt 3, place the setup in a client-only plugin (
          <DocInlineCode>plugins/clickstream.client.ts</DocInlineCode>) so it executes only in the
          browser and never during SSR:
        </DocParagraph>

        <DocCodeBlock
          filename="plugins/clickstream.client.ts"
          code={`import clickStream from '@click-stream/sdk';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const router = useRouter();

  clickStream.init({
    writeKey: config.public.clickstreamWriteKey,
    apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
  });

  router.afterEach((to) => {
    clickStream.page(document.title, {
      path: to.fullPath,
    });
  });
});`}
        />
      </DocSubSection>

      <DocSubSection id="framework-vanilla" title="Vanilla JS">
        <DocParagraph>
          For static sites, multi-page apps, or projects without a bundler, you can load{' '}
          <DocInlineCode>@click-stream/sdk</DocInlineCode> directly from a CDN via an ES module
          import or the IIFE browser bundle.
        </DocParagraph>

        <DocCodeBlock
          filename="index.html"
          code={`<script type="module">
  import clickStream from 'https://esm.sh/@click-stream/sdk';

  clickStream.init({
    writeKey: 'YOUR_PROJECT_WRITE_KEY',
    apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
  });

  clickStream.page(document.title);

  document.getElementById('signup-btn')?.addEventListener('click', () => {
    clickStream.track('signup_started', { source: 'landing_hero' });
  });
</script>`}
        />

        <DocCallout title="Global IIFE Bundle">
          If you prefer a classic <DocInlineCode>&lt;script&gt;</DocInlineCode> tag without{' '}
          <DocInlineCode>type=&quot;module&quot;</DocInlineCode>, load{' '}
          <DocInlineCode>dist/index.iife.js</DocInlineCode> from unpkg or jsDelivr. The SDK attaches
          to <DocInlineCode>window.ClickStream</DocInlineCode>, where{' '}
          <DocInlineCode>window.ClickStream.default</DocInlineCode> is the shared singleton
          instance.
        </DocCallout>
      </DocSubSection>
    </DocSection>
  );
}
