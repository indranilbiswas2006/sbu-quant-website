import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { AnimatedInView } from "../../components/AnimatedInView";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 md:pt-24">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.4em] text-neon">Contact</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">Get in touch with us.</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Reach out for membership, partnerships, or to speak at a workshop.
        </p>
      </AnimatedInView>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <AnimatedInView className="grid gap-5">
          <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-white">
              <Mail className="h-5 w-5 text-neon" />
              <p className="text-lg font-semibold">Email us</p>
            </div>
            <p className="mt-2 text-sm text-white/70">quantsbu@gmail.com</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
              For sponsorships / inquiries
            </p>
          </div>
          <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-white">
              <MessageCircle className="h-5 w-5 text-neon" />
              <p className="text-lg font-semibold">Join Discord</p>
            </div>
            <p className="mt-2 text-sm text-white/70">Meet members, get updates, share projects.</p>
            <a
              href="https://discord.gg/TGxCGcaEwu"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-neon hover:text-neon"
            >
              Join Discord
            </a>
          </div>
          <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-white">
              <Linkedin className="h-5 w-5 text-neon" />
              <p className="text-lg font-semibold">Follow on LinkedIn</p>
            </div>
            <p className="mt-2 text-sm text-white/70">News, events, and alumni highlights.</p>
            <a
              href="https://www.linkedin.com/company/sbqc"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-neon hover:text-neon"
            >
              LinkedIn
            </a>
          </div>
          <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-white">
              <Instagram className="h-5 w-5 text-neon" />
              <p className="text-lg font-semibold">Follow on Instagram</p>
            </div>
            <p className="mt-2 text-sm text-white/70">Behind-the-scenes from meetings and events.</p>
            <a
              href="https://www.instagram.com/quantsbu/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-neon hover:text-neon"
            >
              Instagram
            </a>
          </div>
        </AnimatedInView>

        <AnimatedInView className="space-y-6" delay={0.2}>
          <div className="rounded-2xl border border-white/10 bg-carbon/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
            <p className="mt-3 text-lg text-white">quantsbu@gmail.com</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-carbon/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Location</p>
            <p className="mt-3 text-lg text-white">Stony Brook University, NY</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-carbon/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Meetings</p>
            <p className="mt-3 text-lg text-white">Thursdays • 6:00 - 7:00 PM</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-carbon/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">For sponsors / speakers</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neon" />
                Sponsorship and partnerships
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neon" />
                Guest talks and workshops
              </li>
            </ul>
            <p className="mt-4 text-sm text-white/70">
              Email us at{" "}
              <a
                href="mailto:quantsbu@gmail.com?subject=SBU%20Quant%20Club%20Inquiry"
                className="text-neon hover:text-white"
              >
                quantsbu@gmail.com
              </a>{" "}
              with subject: “SBU Quant Club Inquiry”
            </p>
          </div>
        </AnimatedInView>
      </div>
    </div>
  );
}
