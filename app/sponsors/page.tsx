export default function SponsorsPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col gap-8 px-6 py-16 text-white">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Sponsors
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
          We are grateful for the support of our sponsors who help make the SBU
          Quant Club&apos;s events, workshops, and initiatives possible.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/70">
          Sponsor information coming soon. If your organization is interested in
          partnering with us, please reach out via the{" "}
          <a href="/contact" className="text-neon hover:underline">
            contact page
          </a>
          .
        </p>
      </section>
    </main>
  );
}

