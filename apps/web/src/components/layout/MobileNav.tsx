import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { GithubIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { APP_URLS } from '@/config/urls';

interface MobileNavProps {
  docsUrl?: string;
  githubUrl?: string;
  dashboardUrl?: string;
  loginUrl?: string;
}

export function MobileNav({
  docsUrl = '/docs',
  githubUrl = 'https://github.com/manishbobburi/clickstream',
  dashboardUrl = APP_URLS.dashboard,
  loginUrl = APP_URLS.login,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-md text-foreground hover:bg-muted"
              aria-label="Open mobile menu"
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>

        <SheetContent side="right" className="w-75 sm:w-85 flex flex-col justify-between p-6">
          <div>
            <SheetHeader className="p-0 pb-6 border-b border-border/40 text-left">
              <SheetTitle>
                <Link to="/" onClick={handleLinkClick} className="flex items-center">
                  <Logo />
                  <h1 className="font-semibold text-xl mr-2">ClickStream</h1>
                </Link>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation links for ClickStream
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 pt-6">
              {isDocs ? (
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="flex items-center rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Home
                </Link>
              ) : (
                <Link
                  to={docsUrl}
                  onClick={handleLinkClick}
                  className="flex items-center rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Documentation
                </Link>
              )}

              <a
                href={dashboardUrl}
                onClick={handleLinkClick}
                className="flex items-center rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Dashboard
              </a>

              <a
                href={loginUrl}
                onClick={handleLinkClick}
                className="flex items-center rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Login
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-border/40">
            <a href={APP_URLS.signup} onClick={handleLinkClick}>
              <Button size="lg" className="w-full text-sm font-medium">
                Get Started
              </Button>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="size-4" />
              <span>GitHub</span>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
