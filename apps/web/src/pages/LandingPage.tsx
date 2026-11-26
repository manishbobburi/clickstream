import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center pt-18">
        <Hero />
        <Hero />
        <Hero />
        <Hero />
      </main>
    </div>
  );
}

export default LandingPage;
