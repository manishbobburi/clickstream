import Logo from '@/components/common/Logo';

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden bg-muted lg:block">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <span className="text-xl font-semibold tracking-tight">ClickStream</span>
        </div>
      </div>
    </aside>
  );
}
