import Image from "next/image";
import { GraduationCap, Briefcase, TrendingUp, Globe, Award, Shield, Target, Users, Brain, Zap, Heart, Star } from "lucide-react";

// Icon mapping for dynamic icons from database
const iconMap: Record<string, React.ElementType> = {
  Target,
  Award,
  Globe,
  TrendingUp,
  Shield,
  Users,
  Brain,
  Zap,
  Heart,
  Star,
  GraduationCap,
  Briefcase,
};

export interface LeaderHighlight {
  icon: string;
  label: string;
}

export interface Leader {
  name: string;
  role: string;
  type: string;
  image: string;
  qualifications: string;
  experience: string;
  bio: string[];
  highlights: LeaderHighlight[];
}

export interface LeadershipProps {
  header?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
  leaders?: Leader[];
}

// Default content - used when no database content is provided
const defaultLeaders: Leader[] = [
  {
    name: "Mayank Trivedi",
    role: "Executive Chairman",
    type: "Executive Leadership",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Mayank-Trivedi-resized-1767669788661.jpeg?width=8000&height=8000&resize=contain",
    qualifications: "B.E. Mechanical Engineering",
    experience: "20+ Years Experience",
    bio: [
      "Mayank Trivedi is a seasoned technocrat and visionary leader with over two decades of experience in the healthcare information technology sector. As the Executive Chairman of Cognaium, he brings a proven track record of scaling multinational organizations and delivering mission-critical healthcare solutions globally.",
      "A Mechanical Engineering graduate from Maharaja Sayajirao University of Baroda, Mayank founded Sysware Healthcare Systems, which grew into a global leader in Laboratory Information Systems and was acquired by Eclipsys Corporation (now part of Allscripts). He subsequently served as President of Eclipsys India, where he led the expansion of operations to over 700 professionals.",
      "Currently serving as the CEO of myOnsite Healthcare, Mayank leads the strategic integration of Cognaium within the broader MedinovAI ecosystem, focusing on pioneering AI-driven workforce intelligence for clinical environments. His unique blend of engineering excellence and deep healthcare domain expertise ensures Cognaium remains at the forefront of technological innovation."
    ],
    highlights: [
      { icon: "Target", label: "Strategic Vision" },
      { icon: "Award", label: "Healthcare IT Pioneer" }
    ]
  },
  {
    name: "Harita Oza",
    role: "Chief Executive Officer",
    type: "Executive Leadership",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Harita-1767623824543.jpg?width=8000&height=8000&resize=contain",
    qualifications: "M.Com, MBA",
    experience: "8+ Years Experience",
    bio: [
      "Harita Oza, our Chief Executive Officer, is a distinguished leader whose academic prowess—holding both an M.Com and an MBA—is matched by her formidable track record in the corporate world. With over 8 years of high-impact experience managing multi-national operations across diverse markets, she has become a master architect of organizational scaling and operational efficiency.",
      "Her professional journey is marked by a unique fusion of financial acumen and strategic foresight. Harita has successfully navigated complex global landscapes, spearheading financial transformations and strategic expansion initiatives that have consistently delivered sustainable growth.",
      "A specialist in driving strategic expansion and fostering cross-functional excellence, Harita is dedicated to building robust frameworks that bridge the gap between technological innovation and financial stability. Under her visionary leadership, Cognaium is pioneering the next generation of AI-driven workforce intelligence."
    ],
    highlights: [
      { icon: "Globe", label: "Global Operations" },
      { icon: "TrendingUp", label: "Strategic Expansion" }
    ]
  },
  {
    name: "Bharat Mehta",
    role: "Board Member (Director)",
    type: "Board of Directors",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b465df00-e3e7-4e62-b617-07477a09ba7e/Bharat-Mehta-1767667978259.jpeg?width=8000&height=8000&resize=contain",
    qualifications: "HR, Law & Commerce",
    experience: "40+ Years Experience",
    bio: [
      "Mr. Bharat Mehta is a seasoned HR leader with over four decades of experience across leading Indian and multinational organizations. With academic qualifications in HR & Social Sciences, Law, and Commerce from MS University, he brings a rare blend of strategic people leadership, general management, and social commitment to Cognaium.",
      "His illustrious career includes senior leadership roles such as Director–HR at Allscripts India, Head–HR at Medtronic (Southeast Asia), GM–Corporate HR at Mafatlal Industries, and COO at Talent Anywhere. He is widely respected for CXO-level talent acquisition, organizational structuring, and HR transformation.",
      "Beyond corporate leadership, Mr. Mehta is deeply committed to societal well-being, serving as Chairperson of Friends Society and leading impactful CSR initiatives like rebuilding schools and supporting community health. His people-centric leadership and extensive professional network continue to inspire our commitment to organizational excellence and social responsibility."
    ],
    highlights: [
      { icon: "Shield", label: "Governance & Ethics" },
      { icon: "Award", label: "HR Transformation" }
    ]
  }
];

const defaultHeader = {
  title: "Visionary",
  titleHighlight: "Leadership",
  subtitle: "Meet the driving force behind Cognaium by MedinovAI's mission to revolutionize workforce intelligence.",
};

export function Leadership({ header, leaders }: LeadershipProps = {}) {
  // Merge with defaults
  const headerData = { ...defaultHeader, ...header };
  const leadersData = leaders && leaders.length > 0 ? leaders : defaultLeaders;

  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            {headerData.title} <span className="gradient-text">{headerData.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {headerData.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {leadersData.map((leader, index) => (
            <div key={leader.name} className="glass rounded-3xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center relative z-10`}>
                <div className="w-full md:w-2/5 flex-shrink-0">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass p-2 animate-pulse-glow">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={leader.image}
                        alt={`${leader.name} - ${leader.role}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-3/5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    {leader.type}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{leader.name}</h3>
                  <p className="text-xl font-medium text-accent mb-6">{leader.role}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{leader.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{leader.experience}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {leader.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-6">
                    {leader.highlights.map((highlight, i) => {
                      const IconComponent = iconMap[highlight.icon] || Award;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-accent" />
                          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">{highlight.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
