import Link from "next/link";
import { AnimatedInView } from "../components/AnimatedInView";
export default function HomePage() {
  return (
    <div>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 md:flex-row md:items-center md:pt-24">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.4em] text-neon">Stony Brook University</p>
          <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Build the edge behind tomorrow&apos;s quantitative markets.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Stony Brook Quant Club connects students who love data, markets, and code. We run
            hands-on workshops, research sprints, and speaker nights to explore fun problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-midnight hover:bg-neon"
            >
              View Events
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-neon hover:text-neon"
            >
              Join us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <AnimatedInView className="glass rounded-3xl p-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">What we do</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                A community for breaking into quant.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Stony Brook Quant Club is a student-run community focused on learning quantitative
                finance through workshops, study groups, and speaker events. We explore probability,
                statistics, programming, and market mechanics while helping members prepare for
                internships and recruiting.
              </p>
            </div>
            <div className="flex h-full flex-col justify-center gap-5">
              {[
                "Weekly workshops and study sessions",
                "Quant interview prep: mental math, probability, coding",
                "Speaker events with alumni and industry professionals",
                "Resume reviews and recruiting guidance",
                "Project-based learning (simulations, data analysis, modeling)"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm leading-relaxed text-white/80">
                  <span className="h-2 w-2 rounded-full bg-neon" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimatedInView>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Event Photos</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Snapshots from recent sessions.</h2>
          </div>
          <p className="max-w-md text-sm text-white/60">
            Highlights from recent sessions and speaker nights..
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Convex Analysis Workshop",
              description: "Core optimization concepts and how they appear in quant modeling.",
              image: "/Convex_Analysis.JPG"
            },
            {
              title: "Flow Traders Workshop",
              description: "Market making, pricing mechanics, and a free Chick-fil-A spread.",
              image: "/Flow_Traders.jpg"
            }
          ].map((photo, index) => (
            <AnimatedInView key={photo.title} delay={index * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-carbon/60">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-700/60 via-slate-800/40 to-slate-900/80">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-white">{photo.title}</p>
                  <p className="mt-2 text-sm text-white/70">{photo.description}</p>
                </div>
              </div>
            </AnimatedInView>
          ))}
        </div>
      </section>
    </div>
  );
}
