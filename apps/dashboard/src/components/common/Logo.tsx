import { ASSETS } from '@/config/assets';

function Logo() {
  return (
    <div className="w-6">
      <img
        src={ASSETS.logo.light}
        alt="Logo"
        className="block dark:hidden w-full h-full object-contain"
      />

      <img
        src={ASSETS.logo.dark}
        alt="Logo"
        className="hidden dark:block w-full h-full object-contain"
      />
    </div>
  );
}

export default Logo;
