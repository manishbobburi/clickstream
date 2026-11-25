import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { GithubIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { APP_URLS } from '@/config/urls';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface NavbarProps {
  loginUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  dashboardUrl?: string;
  className?: string;
}

export function Navbar({
  loginUrl = APP_URLS.login,
  githubUrl = 'https://github.com/manishbobburi/clickstream',
  docsUrl = '/docs',
  dashboardUrl = APP_URLS.dashboard,
  className,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDocs) {
    return (
      <header
        className={cn(
          'fixed top-0 right-0 left-0 md:left-[var(--sidebar-width,16rem)] z-20 flex h-14 items-center justify-between transition-[border-color,background-color,box-shadow] duration-200 ease-linear',
          isScrolled
            ? 'bg-background/95 border-b border-border/40 backdrop-blur-sm'
            : 'bg-background/95 border-b border-transparent backdrop-blur-sm',
          className
        )}
      >
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger className="ml-1" />
          <span className="text-lg font-semibold">Documentation</span>
        </div>

        <div className="hidden md:block" />

        <div
          className="hidden md:flex items-center gap-3 sm:gap-4 ml-auto px-6 sm:px-8"
          style={{
            paddingRight: 'max(2rem, calc((100vw - 80rem) / 2 + 2rem))',
          }}
        >
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

        <div className="px-4 md:hidden">
          <MobileNav
            // docsUrl={docsUrl}
            githubUrl={githubUrl}
            dashboardUrl={dashboardUrl}
            loginUrl={loginUrl}
          />
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex h-14 w-full items-center transition-[border-color,background-color,box-shadow] duration-200 ease-linear',
        isScrolled
          ? 'bg-background/95 border-b border-border/40 backdrop-blur-sm'
          : 'bg-background/95 border-b border-transparent backdrop-blur-sm',
        className
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            aria-label="Home"
          >
            <Logo />

            <h1 className="font-semibold text-xl mx-2">ClickStream</h1>
          </Link>

          <nav className="hidden md:flex items-center">
            <Link
              to={docsUrl}
              className="text-md font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Documentation
            </Link>
          </nav>
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
