import { AnimatedInView } from "../../components/AnimatedInView";

export default function EventsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 md:pt-24">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.4em] text-neon">Events</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
          Upcoming events
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          View our full schedule of meetings, workshops, and guest speakers
          directly from our Google Calendar.
        </p>
      </AnimatedInView>

      <AnimatedInView className="mt-10">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-carbon/80">
          <div className="aspect-video w-full">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=quantsbu%40gmail.com&ctz=America%2FNew_York"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SBU Quant Club Events Calendar"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-white/50">
          Replace the calendar URL in this page with your club&apos;s public Google Calendar
          embed link.
        </p>
      </AnimatedInView>
    </main>
  );
}
