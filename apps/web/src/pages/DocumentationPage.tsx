import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DocumentationSidebar } from '@/components/docs/DocumentationSidebar';
import { Navbar } from '@/components/layout/Navbar';
import {
  OverviewSection,
  GettingStartedSection,
  CoreConceptsSection,
  FrameworksSection,
  ConfigurationSection,
  ApiReferenceSection,
  ReliabilitySection,
  PayloadSchemaSection,
} from '@/components/docs/sections/index';

export function DocumentationPage() {
  return (
    <SidebarProvider>
      <DocumentationSidebar />
      <SidebarInset className="min-w-0 flex-1 overflow-x-hidden pt-14">
        <Navbar />
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 py-8 min-w-0">
          <OverviewSection />
          <GettingStartedSection />
          <CoreConceptsSection />
          <FrameworksSection />
          <ConfigurationSection />
          <ApiReferenceSection />
          <ReliabilitySection />
          <PayloadSchemaSection />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DocumentationPage;
