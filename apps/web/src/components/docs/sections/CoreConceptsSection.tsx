import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCallout,
  DocCodeBlock,
  DocList,
} from '@/components/docs/DocumentationComponents';

export function CoreConceptsSection() {
  return (
    <DocSection
      id="core-concepts"
      title="Core Concepts"
      description="Learn how ClickStream captures events, resolves user identity, manages cookie-free sessions, auto-enriches browser context, and respects user privacy."
    >
      <DocSubSection id="concept-event-tracking" title="Event Tracking">
        <DocParagraph>
          At its core, ClickStream records actions taken by users within your web application such
          as button clicks, signups, form submissions, or feature interactions.
        </DocParagraph>

        <DocParagraph>
          To capture an action, call{' '}
          <DocInlineCode>clickStream.track(event, properties?)</DocInlineCode>. Every event requires
          an event name and accepts an optional payload of custom metadata:
        </DocParagraph>

        <DocCodeBlock
          filename="tracking-example.ts"
          code={`// Basic event without custom properties
clickStream.track('signup_button_clicked');

// Event with structured metadata
clickStream.track('order_completed', {
  order_id: 'ord_98721',
  revenue: 79.99,
  currency: 'USD',
  item_count: 2,
  items: ['Mechanical Keyboard', 'Desk Mat'],
  shipping_tier: 'express',
  is_first_order: true,
});`}
        />

        <DocParagraph>
          <strong>Naming Rules &amp; Payload Flexibility:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <strong>Event Names:</strong> Must be a non-empty string up to 128 characters (e.g.{' '}
              <DocInlineCode>checkout_started</DocInlineCode>). Whitespace is automatically trimmed.
            </>,
            <>
              <strong>Properties:</strong> Supports strings, numbers, booleans,{' '}
              <DocInlineCode>null</DocInlineCode>, arrays, and deeply nested objects.
            </>,
          ]}
        />

        <DocParagraph>
          For page navigations, the SDK provides a dedicated{' '}
          <DocInlineCode>clickStream.page(name?, properties?)</DocInlineCode> helper that
          automatically dispatches a <DocInlineCode>page_viewed</DocInlineCode> event with the page
          name and any route properties attached:
        </DocParagraph>

        <DocCodeBlock
          filename="page-tracking.ts"
          code={`// Dispatches 'page_viewed'
clickStream.page('Pricing Table', {
  billing_cycle: 'annual',
  referrer_campaign: 'summer_sale',
});`}
        />
      </DocSubSection>

      <DocSubSection id="concept-identity" title="User Identification">
        <DocParagraph>
          When a visitor first lands on your website, they are completely anonymous and identified
          only by a generated device ID. Once they authenticate (sign up, log in, or provide
          identifying information), you can link their past and future activity to their unique user
          record using <DocInlineCode>clickStream.identify(userId, traits?)</DocInlineCode>.
        </DocParagraph>

        <DocCodeBlock
          filename="auth-identify.ts"
          code={`// Call identify immediately after login or account creation
clickStream.identify('usr_492019', {
  name: 'Alex Rivera',
  email: 'alex@example.com',
  plan: 'team_pro',
  team_size: 8,
  created_at: 1732000000000,
});`}
        />

        <DocParagraph>
          <strong>How identification works under the hood:</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <strong>Immediate Identify Event:</strong> The SDK immediately fires an{' '}
              <DocInlineCode>identify</DocInlineCode> event containing the traits you passed in.
            </>,
            <>
              <strong>Persistent Session Association:</strong> The{' '}
              <DocInlineCode>userId</DocInlineCode> is stored on the SDK instance in memory. From
              that moment on, <em>every subsequent event</em> tracked by{' '}
              <DocInlineCode>track()</DocInlineCode> or <DocInlineCode>page()</DocInlineCode> will
              automatically include <DocInlineCode>user_id</DocInlineCode> in its payload.
            </>,
            <>
              <strong>Identity Stitching:</strong> Because the original anonymous device ID (
              <DocInlineCode>anon_id</DocInlineCode>) is always retained alongside{' '}
              <DocInlineCode>user_id</DocInlineCode>, ClickStream seamlessly bridges pre-login
              discovery activity with post-login actions.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="concept-sessions" title="Sessions & Storage">
        <DocParagraph>
          Traditional analytics tools rely heavily on invasive third-party cookies that trigger
          consent friction and get blocked by modern ad blockers. ClickStream is designed to be{' '}
          <strong>completely cookie-free</strong>, managing identity and sessions through browser
          storage APIs.
        </DocParagraph>

        <DocParagraph>
          The SDK maintains two core identifiers across your application's lifecycle:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>
                Anonymous ID (<DocInlineCode>anon_id</DocInlineCode>):
              </strong>{' '}
              Created on the user's first visit via{' '}
              <DocInlineCode>crypto.randomUUID()</DocInlineCode> and persisted in{' '}
              <DocInlineCode>localStorage</DocInlineCode> under{' '}
              <DocInlineCode>click_stream_anon_id</DocInlineCode>. This remains stable across
              browser tabs and repeat visits.
            </>,
            <>
              <strong>
                Session ID (<DocInlineCode>session_id</DocInlineCode>):
              </strong>{' '}
              Kept in <DocInlineCode>sessionStorage</DocInlineCode> under{' '}
              <DocInlineCode>click_stream_session</DocInlineCode> alongside a timestamp. ClickStream
              enforces a <strong>30-minute sliding inactivity window</strong>. Every tracked event
              automatically touches and extends the session. If the user is inactive for 30 minutes
              or more, the next event automatically generates a fresh session ID.
            </>,
          ]}
        />

        <DocCallout title="Resilient Storage Fallback">
          If a user has browser storage disabled, browses in a strict incognito sandbox, or is
          embedded in a cross-origin iframe with storage partition restrictions, the SDK
          automatically falls back to an in-memory store. Your application will never throw
          unhandled storage access exceptions.
        </DocCallout>
      </DocSubSection>

      <DocSubSection id="concept-context-collection" title="Auto Context">
        <DocParagraph>
          You never need to manually gather screen dimensions, URLs, or browser details. Every event
          generated by the SDK is automatically enriched with 9 essential contextual dimensions
          before it enters the delivery queue:
        </DocParagraph>

        <DocList
          items={[
            <>
              <DocInlineCode>page_url</DocInlineCode>: The full current URL (
              <DocInlineCode>window.location.href</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>page_path</DocInlineCode>: The pathname portion (
              <DocInlineCode>window.location.pathname</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>page_title</DocInlineCode>: The active document title (
              <DocInlineCode>document.title</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>referrer</DocInlineCode>: The referring document or external search
              engine URL (<DocInlineCode>document.referrer</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>user_agent</DocInlineCode>: Raw browser user agent string (
              <DocInlineCode>navigator.userAgent</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>screen_width</DocInlineCode> &amp;{' '}
              <DocInlineCode>screen_height</DocInlineCode>: Display resolution dimensions (
              <DocInlineCode>window.screen</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>language</DocInlineCode>: Primary browser locale (e.g.{' '}
              <DocInlineCode>en-US</DocInlineCode>).
            </>,
            <>
              <DocInlineCode>timezone</DocInlineCode>: Resolved IANA timezone string (e.g.{' '}
              <DocInlineCode>America/New_York</DocInlineCode>).
            </>,
          ]}
        />

        <DocParagraph>
          When executed in non-browser environments (such as server-side pre-rendering in Next.js or
          Nuxt), all string dimensions safely default to empty strings and numeric dimensions
          default to <DocInlineCode>0</DocInlineCode>, guaranteeing zero SSR runtime crashes.
        </DocParagraph>
      </DocSubSection>

      <DocSubSection id="concept-consent" title="Consent & Privacy">
        <DocParagraph>
          To help you comply with GDPR, CCPA, and privacy frameworks, the SDK provides built-in
          consent management so you can easily tie analytics collection to your cookie banner or
          privacy preference center.
        </DocParagraph>

        <DocParagraph>
          You can define initial consent at initialization, or toggle it dynamically at runtime
          using <DocInlineCode>clickStream.consent(granted: boolean)</DocInlineCode>:
        </DocParagraph>

        <DocCodeBlock
          filename="consent-banner.ts"
          code={`// Initialize with consent paused for opt-in regions (e.g., EU visitors)
clickStream.init({
  writeKey: 'YOUR_PROJECT_WRITE_KEY',
  apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
  consent: false, // Tracking paused until user accepts
});

// When user accepts tracking
function onUserAcceptsCookies() {
  clickStream.consent(true); // Resumes tracking & flushes queue
}

// When user rejects or revokes consent
function onUserRejectsCookies() {
  clickStream.consent(false); // Disables tracking & purges in-memory queue
}`}
        />

        <DocParagraph>
          <strong>What happens when consent is revoked?</strong>
        </DocParagraph>
        <DocList
          items={[
            <>
              <strong>Immediate Queue Purge:</strong> Calling{' '}
              <DocInlineCode>clickStream.consent(false)</DocInlineCode> immediately deletes any
              pending events waiting in the in-memory queue so unapproved data is never sent.
            </>,
            <>
              <strong>Silent Drop:</strong> Any future calls to{' '}
              <DocInlineCode>track()</DocInlineCode> or <DocInlineCode>page()</DocInlineCode> will
              be silently dropped without throwing errors until consent is re-granted.
            </>,
          ]}
        />
      </DocSubSection>
    </DocSection>
  );
}
