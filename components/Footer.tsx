import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white">Stony Brook Quant Club</p>
          <p className="mt-2 max-w-sm">Building a community around quantitative finance, data science, and markets.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em]">
          <Link href="/team" className="transition hover:text-white">
            Team
          </Link>
          <Link href="/events" className="transition hover:text-white">
            Events
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
