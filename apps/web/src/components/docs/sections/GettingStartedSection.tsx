import {
  DocSection,
  DocSubSection,
  DocParagraph,
  DocInlineCode,
  DocCodeBlock,
  DocList,
  DocTerminalCommandTabs,
} from '@/components/docs/DocumentationComponents';

const commands = [
  {
    id: 'npm',
    label: 'npm',
    code: 'npm install @click-stream/sdk',
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    code: 'pnpm add @click-stream/sdk',
  },
  {
    id: 'yarn',
    label: 'yarn',
    code: 'yarn add @click-stream/sdk',
  },
  {
    id: 'bun',
    label: 'bun',
    code: 'bun add @click-stream/sdk',
  },
];

export function GettingStartedSection() {
  return (
    <DocSection
      id="getting-started"
      title="Getting Started"
      description="Configure your project credentials, install the SDK through your preferred package manager, and dispatch your first event in minutes."
    >
      <DocSubSection id="prerequisites" title="Prerequisites">
        <DocParagraph>
          Before integrating the SDK into your web application, ensure you have the following
          requirements ready:
        </DocParagraph>

        <DocList
          items={[
            <>
              <strong>Project Write Key:</strong> Generated from your ClickStream dashboard (e.g.{' '}
              <DocInlineCode>wk_...</DocInlineCode>). This authenticates your client and maps
              incoming events to your project.
            </>,
            <>
              <strong>Ingestion API Endpoint:</strong> The ClickStream ingestion endpoint:{' '}
              <DocInlineCode>https://api.clickstream.manishb.in/api/v1/events</DocInlineCode>.
            </>,
            <>
              <strong>Runtime Environment:</strong> Any modern browser. For projects using a build
              tool or bundler (Vite, Next.js, Webpack), Node.js &ge; 18 and a package manager (
              <DocInlineCode>pnpm</DocInlineCode>, <DocInlineCode>npm</DocInlineCode>,{' '}
              <DocInlineCode>yarn</DocInlineCode>, or <DocInlineCode>bun</DocInlineCode>) are
              required.
            </>,
          ]}
        />
      </DocSubSection>

      <DocSubSection id="installation" title="Installation">
        <DocParagraph>
          Install <DocInlineCode>@click-stream/sdk</DocInlineCode> into your project using your
          preferred package manager:
        </DocParagraph>

        <DocTerminalCommandTabs commands={commands} />
      </DocSubSection>

      <DocSubSection id="quick-start" title="Quick Start">
        <DocParagraph>
          Initialize the SDK once at your application's entry point, then start tracking page views
          and user interactions:
        </DocParagraph>

        <DocCodeBlock
          filename="index.ts"
          code={`import clickStream from '@click-stream/sdk';
        
// 1. Initialize
clickStream.init({
    writeKey: 'YOUR_PROJECT_WRITE_KEY',
    apiUrl: 'https://api.clickstream.manishb.in/api/v1/events',
});

// 2. Track initial page view
clickStream.page('Home');

// 3. Track user actions
clickStream.track('button_clicked', {
    button_name: 'hero_cta',
    tier: 'pro',
});`}
        />
      </DocSubSection>
    </DocSection>
  );
}
