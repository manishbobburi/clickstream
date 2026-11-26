import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCodeBlock,
  DocList,
} from '@/components/docs/DocumentationComponents';

export function PayloadSchemaSection() {
  return (
    <DocSection
      id="ingestion-payload"
      title="Payload Schema"
      description="Inspect the exact HTTP wire protocol and JSON payload schema delivered to the ClickStream ingestion endpoint."
    >
      <DocSubSection id="payload-http-schema" title="Endpoint Schema">
        <DocParagraph>
          All event batches are posted to the ClickStream ingestion service via HTTP POST:
        </DocParagraph>

        <DocCodeBlock
          filename="HTTP Request"
          code={`POST /api/v1/events HTTP/1.1
Host: api.clickstream.manishb.in
Content-Type: application/json
Origin: https://yourdomain.com

{
  "write_key": "YOUR_PROJECT_WRITE_KEY",
  "batch": [
    /* Array of BaseEvent objects */
  ]
}`}
        />

        <DocParagraph>
          <strong>Expected Responses:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <strong>200 OK:</strong> The batch has been validated and queued for stream ingestion.
            </>,
            <>
              <strong>400 Bad Request:</strong> The <DocInlineCode>write_key</DocInlineCode> is
              missing or the payload JSON is malformed.
            </>,
            <>
              <strong>401 Unauthorized:</strong> The write key does not match an active ClickStream
              project.
            </>,
            <>
              <strong>429 Too Many Requests:</strong> Ingestion rate limit exceeded; the SDK will
              automatically back off and retry.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="payload-event-fields" title="Event Fields">
        <DocParagraph>
          Every item in the <DocInlineCode>batch</DocInlineCode> array adheres to the{' '}
          <DocInlineCode>BaseEvent</DocInlineCode> contract:
        </DocParagraph>

        <DocCodeBlock
          filename="BaseEvent.json"
          code={`{
  "event_id": "8d3e2b10-6c9f-4e5a-b789-1f2e3d4c5b6a",
  "event": "pricing_plan_selected",
  "timestamp": 1732360000000,
  "anon_id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "session_id": "e9f8a7b6-c5d4-3e2f-1a0b-9c8d7e6f5a4b",
  "user_id": "usr_492019",
  "properties": {
    "plan_tier": "enterprise",
    "annual_billing": true,
    "seats": 25
  },
  "context": {
    "page_url": "https://yourdomain.com/pricing",
    "page_path": "/pricing",
    "page_title": "Plans & Pricing | YourApp",
    "referrer": "https://google.com/",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
    "screen_width": 1920,
    "screen_height": 1080,
    "language": "en-US",
    "timezone": "America/New_York"
  }
}`}
        />

        <DocParagraph>
          <strong>Field Breakdown:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <DocInlineCode>event_id</DocInlineCode> (<DocInlineCode>string</DocInlineCode>):
              Unique UUID generated for each individual event.
            </>,
            <>
              <DocInlineCode>event</DocInlineCode> (<DocInlineCode>string</DocInlineCode>): Name of
              the tracked action (e.g. <DocInlineCode>button_clicked</DocInlineCode>,{' '}
              <DocInlineCode>page_viewed</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>timestamp</DocInlineCode> (<DocInlineCode>number</DocInlineCode>): Unix
              epoch timestamp in milliseconds when the event was recorded on the client.
            </>,
            <>
              <DocInlineCode>anon_id</DocInlineCode> (<DocInlineCode>string</DocInlineCode>):
              Persistent anonymous client UUID stored in localStorage.
            </>,
            <>
              <DocInlineCode>session_id</DocInlineCode> (<DocInlineCode>string</DocInlineCode>):
              30-minute sliding activity session UUID stored in sessionStorage.
            </>,
            <>
              <DocInlineCode>user_id</DocInlineCode> (<DocInlineCode>string</DocInlineCode>,
              optional): Authenticated user ID (included if{' '}
              <DocInlineCode>identify()</DocInlineCode> was called).
            </>,
            <>
              <DocInlineCode>properties</DocInlineCode> (
              <DocInlineCode>Record&lt;string, any&gt;</DocInlineCode>): Custom key-value event
              metadata.
            </>,
            <>
              <DocInlineCode>context</DocInlineCode> (<DocInlineCode>object</DocInlineCode>):
              Automatically collected browser, device, viewport, and locale metadata.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="payload-typescript-types" title="TypeScript Types">
        <DocParagraph>
          The SDK is fully typed and exports all core data models directly from{' '}
          <DocInlineCode>@click-stream/sdk</DocInlineCode>:
        </DocParagraph>

        <DocCodeBlock
          filename="types.d.ts"
          code={`import type {
  ClickStreamConfig,
  BaseEvent,
  EventProperties,
  EventContext,
  IngestionPayload,
} from '@click-stream/sdk';

// Example: strongly typing custom event handlers
function handleAnalyticsEvent(event: BaseEvent) {
  console.log('Dispatched:', event.event, 'by user:', event.user_id);
}`}
        />

        <DocParagraph>
          You can use these interfaces to create strongly typed wrapper functions, custom hooks, or
          validation layers in your codebase.
        </DocParagraph>
      </DocSubSection>
    </DocSection>
  );
}
