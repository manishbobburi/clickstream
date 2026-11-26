import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCodeBlock,
  DocList,
} from '@/components/docs/DocumentationComponents';

export function ApiReferenceSection() {
  return (
    <DocSection
      id="api-reference"
      title="API Reference"
      description="Comprehensive documentation of all public methods, parameters, return types, and code snippets for the ClickStream SDK."
    >
      <DocSubSection id="api-init" title="init()">
        <DocParagraph>
          Initializes the SDK instance, sets up the in-memory event queue, binds page-lifecycle
          listeners (<DocInlineCode>visibilitychange</DocInlineCode>,{' '}
          <DocInlineCode>pagehide</DocInlineCode>), and starts the automatic flush interval timer.
        </DocParagraph>

        <DocCodeBlock
          filename="signature.ts"
          code={`clickStream.init(config: ClickStreamConfig): void`}
        />

        <DocParagraph>
          <strong>Behavior:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>Must be called before any tracking operations take place.</>,
            <>
              Throws an error if <DocInlineCode>writeKey</DocInlineCode> or{' '}
              <DocInlineCode>apiUrl</DocInlineCode> are missing or invalid.
            </>,
            <>
              Calling <DocInlineCode>init()</DocInlineCode> multiple times is safe; subsequent calls
              will log a warning in debug mode and safely no-op.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="api-track" title="track()">
        <DocParagraph>Pushes a custom event into the in-memory delivery queue.</DocParagraph>

        <DocCodeBlock
          filename="signature.ts"
          code={`clickStream.track(event: string, properties?: EventProperties): void`}
        />

        <DocParagraph>
          <strong>Parameters:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <DocInlineCode>event</DocInlineCode> (<DocInlineCode>string</DocInlineCode>,
              required): The name of the event. Must be a non-empty string up to 128 characters.
            </>,
            <>
              <DocInlineCode>properties</DocInlineCode> (
              <DocInlineCode>Record&lt;string, any&gt;</DocInlineCode>, optional): Arbitrary
              key-value metadata. Accepts strings, numbers, booleans,{' '}
              <DocInlineCode>null</DocInlineCode>, arrays, and nested objects.
            </>,
          ]}
        />

        <DocParagraph>
          <strong>Example:</strong>
        </DocParagraph>
        <DocCodeBlock
          filename="track-example.ts"
          code={`clickStream.track('item_purchased', {
  item_id: 'prod_902',
  price: 49.99,
  currency: 'USD',
  tags: ['gadgets', 'wireless'],
  discount_applied: true,
});`}
        />
      </DocSubSection>

      <DocSubSection id="api-identify" title="identify()">
        <DocParagraph>
          Associates future events with an authenticated user ID and dispatches an immediate{' '}
          <DocInlineCode>identify</DocInlineCode> event with user traits.
        </DocParagraph>

        <DocCodeBlock
          filename="signature.ts"
          code={`clickStream.identify(userId: string, traits?: EventProperties): void`}
        />

        <DocParagraph>
          <strong>Parameters:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <DocInlineCode>userId</DocInlineCode> (<DocInlineCode>string</DocInlineCode>,
              required): Unique non-empty user identifier (e.g., database UUID, account ID).
            </>,
            <>
              <DocInlineCode>traits</DocInlineCode> (
              <DocInlineCode>Record&lt;string, any&gt;</DocInlineCode>, optional): User profile
              properties (e.g. <DocInlineCode>email</DocInlineCode>,{' '}
              <DocInlineCode>name</DocInlineCode>, <DocInlineCode>plan</DocInlineCode>).
            </>,
          ]}
        />

        <DocCodeBlock
          filename="identify-example.ts"
          code={`clickStream.identify('usr_78912', {
  email: 'jordan@company.com',
  name: 'Jordan Hayes',
  role: 'editor',
  account_created: 1732000000000,
});`}
        />
      </DocSubSection>

      <DocSubSection id="api-page" title="page()">
        <DocParagraph>
          Convenience helper to record page views. Internally synthesizes and tracks a{' '}
          <DocInlineCode>page_viewed</DocInlineCode> event.
        </DocParagraph>

        <DocCodeBlock
          filename="signature.ts"
          code={`clickStream.page(name?: string, properties?: EventProperties): void`}
        />

        <DocParagraph>
          <strong>Parameters:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <DocInlineCode>name</DocInlineCode> (<DocInlineCode>string</DocInlineCode>, optional):
              Human-readable page title or route name (e.g. <DocInlineCode>'Billing'</DocInlineCode>
              ).
            </>,
            <>
              <DocInlineCode>properties</DocInlineCode> (
              <DocInlineCode>Record&lt;string, any&gt;</DocInlineCode>, optional): Extra metadata
              about the page context.
            </>,
          ]}
        />

        <DocCodeBlock
          filename="page-example.ts"
          code={`// Unnamed page view (captures current document.title and URL automatically)
clickStream.page();

// Named page view with custom metadata
clickStream.page('Checkout', {
  step: 2,
  cart_total: 149.00,
});`}
        />
      </DocSubSection>

      <DocSubSection id="api-consent" title="consent()">
        <DocParagraph>
          Dynamically updates the user's tracking consent status, allowing seamless integration with
          cookie banners and GDPR preference managers.
        </DocParagraph>

        <DocCodeBlock
          filename="signature.ts"
          code={`clickStream.consent(granted: boolean): void`}
        />

        <DocParagraph>
          <strong>Behavior:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              When called with <DocInlineCode>false</DocInlineCode>, the SDK immediately purges all
              pending events from the in-memory queue and drops future events until consent is
              granted.
            </>,
            <>
              When called with <DocInlineCode>true</DocInlineCode>, tracking is re-enabled and
              pending events are immediately flushed to the server.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="api-flush" title="flush()">
        <DocParagraph>
          Forces an immediate network dispatch of all pending events currently in the in-memory
          queue, bypassing the timer and batch size limits.
        </DocParagraph>

        <DocCodeBlock filename="signature.ts" code={`await clickStream.flush(): Promise<void>`} />

        <DocParagraph>
          <strong>Usage:</strong>
        </DocParagraph>
        <DocParagraph>
          Use <DocInlineCode>flush()</DocInlineCode> before critical page transitions or form
          redirects to ensure high-priority events are delivered before navigation completes:
        </DocParagraph>

        <DocCodeBlock
          filename="flush-example.ts"
          code={`async function handleLogout() {
  clickStream.track('user_logged_out');
  
  // Wait for events to dispatch before redirecting
  await clickStream.flush();
  
  window.location.href = '/login';
}`}
        />
      </DocSubSection>

      <DocSubSection id="api-destroy" title="destroy()">
        <DocParagraph>
          Tears down the SDK instance, stops the background timer, unbinds{' '}
          <DocInlineCode>visibilitychange</DocInlineCode> and{' '}
          <DocInlineCode>pagehide</DocInlineCode> listeners, purges the event queue, and resets the
          initialized status.
        </DocParagraph>

        <DocCodeBlock filename="signature.ts" code={`clickStream.destroy(): void`} />

        <DocParagraph>
          This is especially useful for tearing down client state during automated unit tests (Jest,
          Vitest) or when an application unmounts cleanly.
        </DocParagraph>
      </DocSubSection>

      <DocSubSection id="api-custom-instances" title="Custom Instances">
        <DocParagraph>
          While the default export is a pre-instantiated singleton, you can create isolated,
          independent SDK instances using the exported <DocInlineCode>ClickStreamSDK</DocInlineCode>{' '}
          class.
        </DocParagraph>

        <DocCodeBlock
          filename="multiple-trackers.ts"
          code={`import { ClickStreamSDK } from '@click-stream/sdk';
        
// Primary application tracker
const appTracker = new ClickStreamSDK();
appTracker.init({
  writeKey: 'YOUR_PRODUCTION_WRITE_KEY',
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
});

// Secondary tracker for experimental marketing or partner telemetry
const experimentTracker = new ClickStreamSDK();
experimentTracker.init({
  writeKey: 'YOUR_EXPERIMENT_WRITE_KEY',
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
});`}
        />

        <DocParagraph>
          Each instance manages its own in-memory queue, batching timer, transport layer, and retry
          state independently.
        </DocParagraph>
      </DocSubSection>
    </DocSection>
  );
}
