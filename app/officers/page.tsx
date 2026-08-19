import { Linkedin } from "lucide-react";
import { AnimatedInView } from "../../components/AnimatedInView";

const officers = [
  {
    name: "James",
    role: "President",
    intro: "Building a curious, collaborative community around quantitative finance.",
    major: "Add major",
    graduationDate: "Add graduation date",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "David",
    role: "Vice President",
    intro: "Helping turn ambitious ideas into welcoming events and practical projects.",
    major: "Add major",
    graduationDate: "Add graduation date",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/davidrlai/"
  },
  {
    name: "Indranil",
    role: "Treasurer",
    intro: "Keeping the club moving while exploring the ideas behind markets and data.",
    major: "Add major",
    graduationDate: "Add graduation date",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/indranilbiswas06/"
  },
  {
    name: "Chris",
    role: "Secretary",
    intro: "Connecting members, speakers, and workshops through thoughtful organization.",
    major: "Add major",
    graduationDate: "Add graduation date",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com/in/chris-jia-7a45802b3/"
  },
  {
    name: "Mathew",
    role: "Director of Workshops",
    intro: "Designing hands-on sessions that make quantitative concepts easier to explore.",
    major: "Add major",
    graduationDate: "Add graduation date",
    imageSrc: "/team/placeholder.svg",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "Rahul",
    role: "Chairman of the Board",
    intro: "Offering perspective and support as the next generation builds together.",
    major: "Add major",
    graduationDate: "Add graduation date",
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
            <div className="flex items-center gap-5">
              <img
                src={member.imageSrc}
                alt={`${member.name} headshot`}
                className="h-24 w-24 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.3em] text-white/50">
                  {member.role}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/70">{member.intro}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-neon/80">Major</dt>
                <dd className="mt-1 text-sm text-white/80">{member.major}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-neon/80">
                  Graduation
                </dt>
                <dd className="mt-1 text-sm text-white/80">{member.graduationDate}</dd>
              </div>
            </dl>
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
