import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocList,
} from '@/components/docs/DocumentationComponents';
import { ArchitectureDiagram } from '@/components/docs/ArchitectureDiagram';

export function OverviewSection() {
  return (
    <DocSection
      id="overview"
      title="Overview"
      description="ClickStream is an open-source, cookie-free analytics platform. Use the browser SDK to track page views, user journeys, and custom product interactions with reliable in-memory batching and automatic delivery."
    >
      <DocSubSection id="introduction" title="Introduction">
        <DocParagraph>
          Welcome to the ClickStream SDK guide.{' '}
          <a
            className="text-foreground hover:underline underline-offset-4 underline-foreground"
            href="https://www.npmjs.com/package/@click-stream/sdk"
            target="_blank"
          >
            @click-stream/sdk
          </a>{' '}
          is a lightweight, zero-dependency browser library designed to capture user interactions
          and product telemetry without the bloat of traditional analytics scripts.
        </DocParagraph>

        <DocParagraph>
          The SDK runs entirely cookie-free, managing anonymous visitors and 30-minute sessions via
          browser storage while automatically enriching every event with device and viewport
          context. It also takes care of in-memory queueing, exponential retry backoff, and
          beacon-based delivery when users leave the page.
        </DocParagraph>
      </DocSubSection>

      <DocSubSection id="architecture" title="Architecture">
        <DocParagraph>
          ClickStream separates event collection from network delivery so tracking calls never block
          your application&apos;s main thread or UI rendering. Every event moves through four stages
          from browser capture to the dashboard:
        </DocParagraph>

        <ArchitectureDiagram />

        <DocList
          items={[
            <>
              <strong>Capture &amp; Enrichment:</strong> Calling{' '}
              <DocInlineCode>track()</DocInlineCode>, <DocInlineCode>page()</DocInlineCode>, or{' '}
              <DocInlineCode>identify()</DocInlineCode> creates an event with a unique{' '}
              <DocInlineCode>event_id</DocInlineCode>, attaches your{' '}
              <DocInlineCode>anon_id</DocInlineCode> and 30-minute{' '}
              <DocInlineCode>session_id</DocInlineCode>, and appends viewport, URL, and locale
              metadata.
            </>,
            <>
              <strong>In-Memory Batching:</strong> Events are buffered in a bounded FIFO queue
              (default max: 1,000) and flushed automatically every 3 seconds or as soon as 10 events
              accumulate.
            </>,
            <>
              <strong>Resilient Transport:</strong> Batches are sent to the ingestion API via{' '}
              <DocInlineCode>fetch</DocInlineCode> with exponential backoff on{' '}
              <DocInlineCode>408</DocInlineCode>, <DocInlineCode>429</DocInlineCode>, and{' '}
              <DocInlineCode>5xx</DocInlineCode> responses, switching to{' '}
              <DocInlineCode>navigator.sendBeacon</DocInlineCode> when the user leaves the page.
            </>,
            <>
              <strong>Ingestion &amp; Storage:</strong> The ClickStream API validates your{' '}
              <DocInlineCode>write_key</DocInlineCode>, normalizes client context, and persists the
              events so metrics appear immediately in your dashboard.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="features" title="Features">
        <DocParagraph>
          The SDK is engineered for resilience, privacy, and minimal runtime overhead. Key
          capabilities include:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Zero Runtime Dependencies:</strong> Weighs ~2.8 kB minified and gzipped,
              adding negligible weight to your production bundles.
            </>,
            <>
              <strong>Smart Queueing &amp; Batching:</strong> Buffers events in an in-memory queue
              and flushes when reaching the batch size (default: 10) or on a regular timer (default:
              3s) to minimize network overhead.
            </>,
            <>
              <strong>Guaranteed Page-Exit Delivery:</strong> Listens to{' '}
              <DocInlineCode>visibilitychange</DocInlineCode> and{' '}
              <DocInlineCode>pagehide</DocInlineCode> events, using{' '}
              <DocInlineCode>navigator.sendBeacon</DocInlineCode> and{' '}
              <DocInlineCode>keepalive: true</DocInlineCode> so events aren't dropped when users
              navigate away or close tabs.
            </>,
            <>
              <strong>Resilient Exponential Retries:</strong> Transient network errors and retryable
              server responses (<DocInlineCode>408</DocInlineCode>,{' '}
              <DocInlineCode>429</DocInlineCode>, <DocInlineCode>5xx</DocInlineCode>) are retried
              with exponential backoff (up to 10s delay).
            </>,
            <>
              <strong>Cookie-Free Sessions &amp; Identity:</strong> Tracks anonymous devices via{' '}
              <DocInlineCode>localStorage</DocInlineCode> and manages 30-minute sliding activity
              sessions in <DocInlineCode>sessionStorage</DocInlineCode>, with automatic in-memory
              fallback for restricted environments.
            </>,
            <>
              <strong>Automatic Context Enrichment:</strong> Attaches viewport dimensions, page URL,
              referrer, user agent, browser language, and timezone to every event payload
              automatically.
            </>,
            <>
              <strong>Dynamic Privacy Controls:</strong> Pause tracking and purge in-memory queued
              events instantly using <DocInlineCode>clickStream.consent(false)</DocInlineCode> for
              GDPR and CCPA compliance.
            </>,
            <>
              <strong>TypeScript Native:</strong> Written in TypeScript with complete type
              definitions exported for all configs, events, properties, and context metadata.
            </>,
          ]}
        />
      </DocSubSection>
    </DocSection>
  );
}
