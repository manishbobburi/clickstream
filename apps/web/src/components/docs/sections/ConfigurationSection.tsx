import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCodeBlock,
  DocList,
  DocTable,
} from '@/components/docs/DocumentationComponents';

export function ConfigurationSection() {
  return (
    <DocSection
      id="configuration"
      title="Configuration"
      description="Fine-tune SDK behavior including batching intervals, queue thresholds, request timeouts, and debug logging."
    >
      <DocSubSection id="config-options" title="Options">
        <DocParagraph>
          The SDK is preconfigured with production-ready defaults, but you can tailor every timing
          and network threshold by passing a configuration object to{' '}
          <DocInlineCode>clickStream.init(config)</DocInlineCode>:
        </DocParagraph>

        <DocTable
          allowHorizontalScroll
          headers={['Option', 'Type', 'Default', 'Description']}
          rows={[
            [
              <>
                <DocInlineCode>writeKey</DocInlineCode>
                <span className="ml-1.5 text-xs text-red-500 font-medium">Required</span>
              </>,
              <DocInlineCode>string</DocInlineCode>,
              '-',
              'Your project write key obtained from the ClickStream dashboard.',
            ],
            [
              <>
                <DocInlineCode>apiUrl</DocInlineCode>
                <span className="ml-1.5 text-xs text-red-500 font-medium">Required</span>
              </>,
              <DocInlineCode>string</DocInlineCode>,
              '-',
              <>
                The ClickStream ingestion endpoint (
                <DocInlineCode>https://api.clickstream.manishb.in/api/v1/events</DocInlineCode>).
              </>,
            ],
            [
              <DocInlineCode>flushInterval</DocInlineCode>,
              <DocInlineCode>number</DocInlineCode>,
              <DocInlineCode>3000</DocInlineCode>,
              'Interval in milliseconds between automatic periodic background flushes. Must be > 0.',
            ],
            [
              <DocInlineCode>batchSize</DocInlineCode>,
              <DocInlineCode>number</DocInlineCode>,
              <DocInlineCode>10</DocInlineCode>,
              'Number of queued events that triggers an immediate network dispatch. Must be > 0.',
            ],
            [
              <DocInlineCode>maxQueueSize</DocInlineCode>,
              <DocInlineCode>number</DocInlineCode>,
              <DocInlineCode>1000</DocInlineCode>,
              'Maximum events held in memory. If capacity is exceeded, oldest events are dropped to prevent memory leaks. Must be > 0.',
            ],
            [
              <DocInlineCode>maxRetries</DocInlineCode>,
              <DocInlineCode>number</DocInlineCode>,
              <DocInlineCode>3</DocInlineCode>,
              <>
                Maximum retry attempts for retryable failures (<DocInlineCode>408</DocInlineCode>,{' '}
                <DocInlineCode>429</DocInlineCode>, <DocInlineCode>5xx</DocInlineCode>, or network
                drops). Must be an integer &ge; 0.
              </>,
            ],
            [
              <DocInlineCode>requestTimeout</DocInlineCode>,
              <DocInlineCode>number</DocInlineCode>,
              <DocInlineCode>10000</DocInlineCode>,
              'Network request timeout in milliseconds before aborting the request. Must be > 0.',
            ],
            [
              <DocInlineCode>consent</DocInlineCode>,
              <DocInlineCode>boolean</DocInlineCode>,
              <DocInlineCode>true</DocInlineCode>,
              <>
                Initial tracking consent state. Set to <DocInlineCode>false</DocInlineCode> to pause
                collection until explicit opt-in.
              </>,
            ],
            [
              <DocInlineCode>debug</DocInlineCode>,
              <DocInlineCode>boolean</DocInlineCode>,
              <DocInlineCode>false</DocInlineCode>,
              <>
                Enables diagnostic logging in browser developer tools under the{' '}
                <DocInlineCode>[ClickStream]</DocInlineCode> prefix.
              </>,
            ],
          ]}
        />

        <DocParagraph>
          Here is an example configuring a high-volume app with customized flush intervals and queue
          sizes:
        </DocParagraph>

        <DocCodeBlock
          filename="clickstream.config.ts"
          code={`clickStream.init({
  writeKey: 'YOUR_PROJECT_WRITE_KEY',
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
  flushInterval: 5000,   // Flush every 5 seconds
  batchSize: 25,         // Or flush immediately when 25 events accumulate
  maxQueueSize: 2000,    // Allow up to 2000 events in memory buffer
  maxRetries: 5,         // Retry up to 5 times on server/network issues
  requestTimeout: 8000,  // Abort requests that take longer than 8s
  debug: false,
});`}
        />
      </DocSubSection>

      <DocSubSection id="config-security" title="Security & HTTPS">
        <DocParagraph>
          Data integrity and user privacy are prioritized across the transport layer. The SDK
          enforces strict validation when <DocInlineCode>init()</DocInlineCode> is called:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Strict HTTPS Enforcement:</strong> The SDK validates that{' '}
              <DocInlineCode>apiUrl</DocInlineCode> uses the secure{' '}
              <DocInlineCode>https://</DocInlineCode> protocol. Non-HTTPS URLs are rejected with a
              runtime error (<DocInlineCode>ClickStream: apiUrl must use HTTPS.</DocInlineCode>) to
              ensure write keys and analytics payloads are encrypted in transit.
            </>,
            <>
              <strong>Input Validation:</strong> Numeric parameters (
              <DocInlineCode>batchSize</DocInlineCode>, <DocInlineCode>flushInterval</DocInlineCode>
              , <DocInlineCode>requestTimeout</DocInlineCode>) must be strictly positive, and{' '}
              <DocInlineCode>maxRetries</DocInlineCode> must be a non-negative integer.
            </>,
            <>
              <strong>Browser Origin Verification:</strong> Outgoing requests natively include the
              browser's <DocInlineCode>Origin</DocInlineCode> header, allowing the ClickStream API
              to verify and authorize client domains.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="config-debug" title="Debugging">
        <DocParagraph>
          When diagnosing integration issues or verifying that events are firing correctly, turn on{' '}
          <DocInlineCode>debug: true</DocInlineCode>.
        </DocParagraph>

        <DocCodeBlock
          filename="analytics.ts"
          code={`clickStream.init({
  writeKey: 'YOUR_PROJECT_WRITE_KEY',
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
  debug: process.env.NODE_ENV === 'development', // Enable only in development
});`}
        />

        <DocParagraph>
          When enabled, the SDK outputs real-time diagnostics directly to the browser console:
        </DocParagraph>

        <DocList
          items={[
            <>
              <DocInlineCode>[ClickStream] SDK initialized.</DocInlineCode> confirms configuration
              validity.
            </>,
            <>
              <DocInlineCode>[ClickStream] Successfully sent 10 events.</DocInlineCode> confirms
              successful batch delivery.
            </>,
            <>
              <DocInlineCode>[ClickStream] Failed to send events.</DocInlineCode> logs network or
              server response details when a batch fails.
            </>,
            <>
              <DocInlineCode>[ClickStream] track() called before init().</DocInlineCode> warns if
              tracking occurs before setup.
            </>,
            <>
              <DocInlineCode>[ClickStream] Invalid event name: ...</DocInlineCode> alerts you when
              an event name is empty or exceeds 128 characters.
            </>,
          ]}
        />
      </DocSubSection>
    </DocSection>
  );
}
