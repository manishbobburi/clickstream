import { Button } from '@/components/ui/button';
import { APP_URLS } from '@/config/urls';

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-7.5rem)] flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-foreground leading-[1.08] sm:leading-[1.06]">
          <>
            See how
            <br />
            users interact with
            <br />
            your product.
          </>
        </h1>

        <p className="mt-7 max-w-xl text-muted-foreground text-lg sm:leading-relaxed">
          <>
            The developer-first analytics platform.
            <br className="hidden sm:inline" /> Capture custom events, analyze users behavior, and
            own your raw analytics data.
          </>
        </p>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3">
          <a href={APP_URLS.signup}>
            <Button
              size="lg"
              className="text-md font-medium transition-transform active:scale-95 cursor-pointer"
            >
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
