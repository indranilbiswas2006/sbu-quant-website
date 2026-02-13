import { Linkedin } from "lucide-react";
import { AnimatedInView } from "../../components/AnimatedInView";

const officers = [
  {
    name: "James",
    role: "President",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "David",
    role: "Vice President",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/davidrlai/"
  },
  {
    name: "Indranil",
    role: "Treasurer",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/indranilbiswas06/"
  },
  {
    name: "Chris",
    role: "Secretary",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/chris-jia-7a45802b3/"
  },
  {
    name: "Mathew",
    role: "Director of Workshops",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "Rahul",
    role: "Chairman of the Board",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/rahul-muthu-073366218/"
  }
];

export default function OfficersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 md:pt-24">
      <AnimatedInView>
        <p className="text-xs uppercase tracking-[0.4em] text-neon">Our officers</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">Meet the builders.</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Quant Club is led by students across math and computer science majors. We collaborate
          to design workshops, host guest speakers, and run game nights.
        </p>
      </AnimatedInView>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {officers.map((member, index) => (
          <AnimatedInView
            key={member.name}
            delay={index * 0.08}
            className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.imageSrc}
                alt={`${member.name} headshot`}
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.3em] text-white/50">
                  {member.role}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="inline-flex items-center gap-2 text-white/60 transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(200, 16, 46,0.35)]"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.25em] text-white/50 opacity-0 transition-opacity group-hover:opacity-100">
                  View LinkedIn →
                </span>
              </a>
            </div>
          </AnimatedInView>
        ))}
      </div>
    </div>
  );
}
