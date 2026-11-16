import { useEffect, useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { GithubIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { APP_URLS } from '@/config/urls';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

interface NavbarProps {
  loginUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  dashboardUrl?: string;
}

export function Navbar({
  loginUrl = APP_URLS.login,
  githubUrl = 'https://github.com/manishbobburi/clickstream',
  docsUrl = '/docs',
  dashboardUrl = APP_URLS.dashboard,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[border-color,background-color,box-shadow] duration-200',
        isScrolled
          ? 'bg-background border-b border-border/40'
          : 'bg-background border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            aria-label="Home"
          >
            <Logo />
          </a>

          {/* <nav className="hidden md:flex items-center">
            <a
              href={docsUrl}
              className="text-md font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Docs
            </a>
          </nav> */}
        </div>

        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="size-4" />
          </a>

          <span className="text-muted-foreground/20">|</span>

          <a href={dashboardUrl}>
            <Button
              variant="ghost"
              size="lg"
              className="text-md font-medium text-foreground hover:text-muted-foreground hover:bg-muted-foreground/0 cursor-pointer"
            >
              Dashboard
            </Button>
          </a>

          <a href={loginUrl}>
            <Button
              variant="ghost"
              size="lg"
              className="text-md font-medium text-foreground hover:text-muted-foreground hover:bg-muted-foreground/0 cursor-pointer"
            >
              Login
            </Button>
          </a>
        </div>

        <MobileNav
          docsUrl={docsUrl}
          githubUrl={githubUrl}
          dashboardUrl={dashboardUrl}
          loginUrl={loginUrl}
        />
      </div>
    </header>
  );
}

export default Navbar;
