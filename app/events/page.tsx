import { AnimatedInView } from "../../components/AnimatedInView";

const events = [
  {
    title: "Alpha Lab Kickoff",
    date: "Sep 12",
    description: "Launch week: data sources, team matching, and strategy ideation."
  },
  {
    title: "Market Microstructure Night",
    date: "Sep 26",
    description: "Order books, liquidity dynamics, and trading cost analysis."
  },
  {
    title: "ML for Factor Signals",
    date: "Oct 10",
    description: "Build feature pipelines and evaluate factor efficacy." 
  },
  {
    title: "Guest Speaker: Quant PM",
    date: "Oct 24",
    description: "Portfolio construction stories from the buy-side."
  }
];

const pastEvents = [
  "Volatility surfaces workshop",
  "Python bootcamp for time-series",
  "Crypto market structure roundtable",
  "Internship prep: quant interviews"
];

export default function EventsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 md:pt-24">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.4em] text-neon">Events</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">Learn by doing.</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          We run a mix of workshops, trading simulations, and industry talks. New members can
          always jump in with our on-ramp sessions.
        </p>
      </AnimatedInView>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {events.map((event, index) => (
          <AnimatedInView key={event.title} delay={index * 0.1} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{event.title}</h3>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                {event.date}
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70">{event.description}</p>
          </AnimatedInView>
        ))}
      </div>

      <AnimatedInView className="mt-12 rounded-3xl border border-white/10 bg-carbon/60 p-8">
        <h2 className="text-2xl font-semibold text-white">Recent highlights</h2>
        <ul className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-2">
          {pastEvents.map((event) => (
            <li key={event} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              {event}
            </li>
          ))}
        </ul>
      </AnimatedInView>
    </div>
  );
}
