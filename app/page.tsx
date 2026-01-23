import Link from "next/link";
import { AnimatedInView } from "../components/AnimatedInView";
import { HeroFade } from "../components/HeroFade";
import CurveFittingDemo from "../components/CurveFittingDemo";

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
            hands-on workshops, research sprints, and speaker nights to explore systematic
            strategies and modern finance.
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
        <HeroFade className="flex-1">
          <CurveFittingDemo />
        </HeroFade>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Workshops",
              description: "Hands-on sessions covering probability, statistics, options basics, and quant-style problem solving."
            },
            {
              title: "Interview Prep",
              description: "Weekly practice for mental math, brainteasers, coding, and quant recruiting fundamentals."
            },
            {
              title: "Python + Data",
              description: "Guest speakers, alumni chats, and a student network to learn what quant roles are actually like."
            }
          ].map((item, index) => (
            <AnimatedInView key={item.title} delay={index * 0.1} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </AnimatedInView>
          ))}
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
              <div className="pt-2">
                <a
                  href="https://discord.gg/TGxCGcaEwu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-neon hover:text-neon"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </AnimatedInView>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Members", value: "25+" },
            { label: "Workshops", value: "6" },
            { label: "Speaker Events", value: "3+" }
          ].map((stat, index) => (
            <AnimatedInView
              key={stat.label}
              delay={index * 0.1}
              className="rounded-2xl border border-white/10 bg-carbon/60 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            </AnimatedInView>
          ))}
        </div>
      </section>
    </div>
  );
}
