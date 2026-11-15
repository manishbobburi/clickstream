import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/Logo';

import { NavMain } from './NavMain';
import { UserNav } from './UserNav';

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLogoClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b p-0">
        <div className="flex h-14 items-center px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex h-10 w-full items-center gap-2 rounded-md px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Logo />

            <span className="truncate text-lg font-semibold group-data-[collapsible=icon]:hidden">
              ClickStream
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
