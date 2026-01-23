import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
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
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://www.linkedin.com/company/sbqc"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="text-white/60 transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(200, 16, 46,0.35)]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/quantsbu/"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
            className="text-white/60 transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(200, 16, 46,0.35)]"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-neon hover:text-white"
          >
            Join Us
          </Link>
        </div>
      </div>
    </header>
  );
}
