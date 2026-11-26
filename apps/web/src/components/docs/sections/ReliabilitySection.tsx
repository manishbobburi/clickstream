import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCallout,
  DocList,
} from '@/components/docs/DocumentationComponents';

export function ReliabilitySection() {
  return (
    <DocSection
      id="reliability-delivery"
      title="Reliability"
      description="Explore the internal engineering that prevents event loss: in-memory queueing, keepalive beacon flushes on page exit, and exponential retry backoff."
    >
      <DocSubSection id="delivery-queue-batching" title="Batching & Queue">
        <DocParagraph>
          Dispatching an individual HTTP request for every single button click or interaction
          creates unnecessary network congestion, drains battery, and can degrade application
          responsiveness.
        </DocParagraph>

        <DocParagraph>
          To avoid this, the SDK introduces a memory-efficient FIFO buffer (
          <DocInlineCode>EventQueue</DocInlineCode>) that aggregates events into batches:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Dual-Trigger Flushing:</strong> A batch is dispatched as soon as the queue
              reaches <DocInlineCode>batchSize</DocInlineCode> (default: 10 events), or whenever the
              periodic <DocInlineCode>flushInterval</DocInlineCode> timer (default: 3000ms)
              elapses—whichever comes first.
            </>,
            <>
              <strong>Concurrency Guard:</strong> An internal{' '}
              <DocInlineCode>isFlushing</DocInlineCode> flag ensures that only one HTTP flush runs
              at a time, preventing race conditions or duplicated dispatches.
            </>,
            <>
              <strong>Bounded Memory Buffer:</strong> The queue is strictly capped by{' '}
              <DocInlineCode>maxQueueSize</DocInlineCode> (default: 1000 events). If network
              connectivity drops for an extended period and the queue reaches capacity, the oldest
              events are dropped (<DocInlineCode>shift()</DocInlineCode>) to protect your
              application from memory leaks.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="delivery-sendbeacon" title="Page Exit (Beacon)">
        <DocParagraph>
          The most common point of event loss in web analytics occurs when a user closes a tab,
          navigates to an external link, or refreshes the page while events are still queued in
          memory. Standard asynchronous <DocInlineCode>fetch</DocInlineCode> calls are often
          cancelled mid-flight by the browser during unload.
        </DocParagraph>

        <DocParagraph>
          ClickStream uses a two-pronged defense to guarantee page-exit delivery:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Lifecycle Listeners:</strong> The SDK automatically binds to{' '}
              <DocInlineCode>document.addEventListener('visibilitychange')</DocInlineCode> (when
              visibility becomes <DocInlineCode>'hidden'</DocInlineCode>) and{' '}
              <DocInlineCode>window.addEventListener('pagehide')</DocInlineCode>, which modern
              browsers guarantee will run before unmounting.
            </>,
            <>
              <strong>Navigator sendBeacon:</strong> During page exit, the SDK packages pending
              events into an asynchronous JSON blob and dispatches them via{' '}
              <DocInlineCode>navigator.sendBeacon()</DocInlineCode>. This delegates delivery
              directly to the operating system's browser process, completing transmission even after
              your page has fully unloaded.
            </>,
            <>
              <strong>Fetch Keepalive:</strong> For regular batch transmissions, the SDK specifies{' '}
              <DocInlineCode>keepalive: true</DocInlineCode> on HTTP requests, instructing the
              browser to complete in-flight requests even if the originating document closes.
            </>,
            <>
              <strong>Restoration on Failure:</strong> If{' '}
              <DocInlineCode>navigator.sendBeacon</DocInlineCode> returns{' '}
              <DocInlineCode>false</DocInlineCode> (for example, if the browser beacon queue is
              momentarily full), the un-sent events are prepended back to the queue so they can be
              sent if the page becomes visible again.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="delivery-retries" title="Retries & Backoff">
        <DocParagraph>
          When network blips occur or the ingestion endpoint experiences heavy load, events
          shouldn't simply vanish. The SDK implements smart retry logic with exponential backoff:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Selective Retry Policy:</strong> The SDK distinguishes between temporary
              network issues and permanent client errors. Requests returning status codes{' '}
              <DocInlineCode>408</DocInlineCode> (Request Timeout),{' '}
              <DocInlineCode>429</DocInlineCode> (Too Many Requests), or{' '}
              <DocInlineCode>5xx</DocInlineCode> (Server Errors)—as well as network aborts and
              connectivity failures—are flagged as retryable.
            </>,
            <>
              <strong>Fast Failure on Client Errors:</strong> Permanent errors like{' '}
              <DocInlineCode>400 Bad Request</DocInlineCode> or{' '}
              <DocInlineCode>401 Unauthorized</DocInlineCode> fail immediately without wasting
              network retries.
            </>,
            <>
              <strong>Exponential Backoff Formula:</strong> Retries back off smoothly with the delay
              calculated as <DocInlineCode>Math.min(1000 * 2^attempt, 10000)</DocInlineCode> ms (1s,
              2s, 4s, 8s, up to a maximum 10s ceiling).
            </>,
            <>
              <strong>Queue Restoration:</strong> If all retry attempts are exhausted without
              success, the entire failed batch is restored to the head of the queue (
              <DocInlineCode>queue.prepend(batch)</DocInlineCode>), ensuring chronological order is
              maintained on subsequent retry cycles.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="delivery-storage-fallback" title="Storage Fallbacks">
        <DocParagraph>
          To deliver cookie-free tracking, ClickStream leverages{' '}
          <DocInlineCode>localStorage</DocInlineCode> for anonymous device IDs and{' '}
          <DocInlineCode>sessionStorage</DocInlineCode> for 30-minute activity sessions.
        </DocParagraph>

        <DocParagraph>
          However, strict browser privacy modes, privacy-focused extensions, or sandboxed
          cross-origin iframes may throw a <DocInlineCode>SecurityError</DocInlineCode> when storage
          APIs are accessed.
        </DocParagraph>

        <DocCallout title="Zero Storage Exceptions">
          The SDK wraps all storage operations in defensive abstractions. If{' '}
          <DocInlineCode>localStorage</DocInlineCode> or{' '}
          <DocInlineCode>sessionStorage</DocInlineCode> access fails or is blocked, the SDK
          seamlessly and silently falls back to an in-memory <DocInlineCode>Map</DocInlineCode>{' '}
          adapter. Your web app will never crash due to restricted storage access.
        </DocCallout>
      </DocSubSection>
    </DocSection>
  );
}
