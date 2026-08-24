import { Linkedin } from "lucide-react";
import { AnimatedInView } from "../../components/AnimatedInView";

const officers = [
  {
    name: "James Cao",
    role: "President",
    major: "Computer Science",
    year: "2027",
    imageSrc: "/team/james-cao.png",
    quote: "Excited to meet you all!",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "David Lai",
    role: "Vice President",
    major: "Computer Science & Applied Mathematics and Statistics",
    year: "2027",
    imageSrc: "/team/david-lai.jpg",
    quote: "idk",
    linkedinUrl: "https://www.linkedin.com/in/davidrlai/"
  },
  {
    name: "Mathew Khan",
    role: "Secretary",
    major: "Pure Mathematics",
    year: "2027",
    imageSrc: "/team/mathew-khan.jpg",
    quote: "I, for one, like Roman numerals.",
    linkedinUrl: "https://www.linkedin.com/in/matthew-khan-a032bb220/"
  },
  {
    name: "Indranil Biswas",
    role: "Treasurer",
    major: "Pure Mathematics & Applied Mathematics and Statistics",
    year: "2028",
    imageSrc: "/team/indranil-biswas.jpg",
    quote: "Order is repetition of units. Chaos is multiplicity without rhythm",
    linkedinUrl: "https://www.linkedin.com/in/indranilbiswas06/"
  },
  {
    name: "David McLean",
    role: "Social Media Manager",
    major: "Applied Mathematics and Statistics",
    year: "2028",
    imageSrc: "/team/david-mclean.jpg",
    quote: "Cookies and cream is the best ice cream flavor.",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    name: "Raafay Ali",
    role: "Sophomore Representative",
    major: "Computer Science & Applied Mathematics and Statistics",
    year: "2029",
    imageSrc: "/team/raafay.png",
    quote: "The Lion doesn’t tap to ankle locks",
    linkedinUrl: "https://www.linkedin.com/in/syedraafayali/"
  },
  {
    name: "Mathew Sharma",
    role: "Sophomore Representative",
    major: "Applied Mathematics and Statistics",
    year: "2029",
    imageSrc: "/team/mathew-sharma.jpg",
    quote: "optimizing for max sharpe and minimum free time",
    linkedinUrl: "https://www.linkedin.com"
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
            className="glass group rounded-2xl p-7 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-6">
              <img
                src={member.imageSrc}
                alt={`${member.name} headshot`}
                className="h-40 w-36 shrink-0 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.3em] text-white/50">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-white/65">
                  {member.major} · Class of {member.year}
                </p>
              </div>
            </div>
            <p className="mt-5 border-l border-neon/40 pl-4 text-sm italic leading-relaxed text-white/65">
              “{member.quote}”
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                className="inline-flex items-center gap-2 text-white/60 transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(200,16,46,0.35)]"
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
