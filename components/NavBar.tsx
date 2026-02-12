import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Events", href: "/events" },
  { label: "Officers", href: "/officers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" }
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-midnight/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <Image
            src="/Logo_SBQC.png"
            alt="SBU Quant Club"
            width={36}
            height={36}
            className="rounded-full"
          />
          SBU Quant Club
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
