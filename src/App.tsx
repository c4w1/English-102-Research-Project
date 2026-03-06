import React, { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
} from "framer-motion";
import {
    Camera,
    Tv,
    Users,
    ExternalLink,
    Quote,
    Smartphone,
    Navigation2,
    ChevronRight,
    Info,
    Layers,
    History,
    X,
    Play,
    ChevronDown,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Utility ────────────────────────────────────────────────────────────────

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface SectionHeadingProps {
    children: React.ReactNode;
    subtitle?: string;
    label: string;
}

interface FeatureCardProps {
    title: string;
    description: string;
    detail: string;
    icon: React.ComponentType<{ className?: string }>;
    delay?: number;
}

interface TimelineItemProps {
    year: string;
    title: string;
    desc: string;
    detail: string;
    isLast?: boolean;
}

interface ArchiveLinkProps {
    href: string;
    children: React.ReactNode;
}

interface ArchiveFeedModalProps {
    open: boolean;
    onClose: () => void;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useActiveSection(sections: string[]) {
    const [active, setActive] = useState("");

    useEffect(() => {
        const observers = sections.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id);
                },
                { threshold: 0.3 }
            );

            obs.observe(el);
            return obs;
        });

        return () => observers.forEach((o) => o?.disconnect());
    }, []);

    return active;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const active = useActiveSection(["incident", "tech", "performance", "now"]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "1999", id: "incident", icon: <History className="w-4 h-4" /> },
        { name: "TECH", id: "tech", icon: <Tv className="w-4 h-4" /> },
        { name: "PERFORM", id: "performance", icon: <Users className="w-4 h-4" /> },
        { name: "NOW", id: "now", icon: <Smartphone className="w-4 h-4" /> },
    ];

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-center",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
                    : "bg-transparent"
            )}
        >
            <div className="w-full max-w-7xl flex items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center font-bold text-black text-xl">
                        W
                    </div>
                    <span className="text-xl tracking-wider text-white font-bold font-display">
                        THE ARCHIVE
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={cn(
                                "flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative pb-1",
                                active === link.id
                                    ? "text-yellow-400"
                                    : "text-white/50 hover:text-yellow-400"
                            )}
                        >
                            {link.icon}
                            {link.name}
                            {active === link.id && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-yellow-400"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="px-4 py-1.5 border border-yellow-400 text-yellow-400 font-bold text-[10px] tracking-widest uppercase">
                    EN 102 PROJECT
                </div>
            </div>
        </nav>
    );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ children, subtitle, label }: SectionHeadingProps) {
    return (
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-yellow-400" />
                <span className="text-yellow-400 font-bold text-xs tracking-widest uppercase">
          {label}
        </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 uppercase leading-[1.1] md:leading-none tracking-normal font-display">
                {children}
            </h2>
            {subtitle && (
                <p className="text-xl text-white/50 italic max-w-xl">{subtitle}</p>
            )}
        </div>
    );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
                         title,
                         description,
                         detail,
                         icon: Icon,
                         delay = 0,
                     }: FeatureCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            viewport={{ once: true }}
            className={cn(
                "p-8 bg-white/5 border transition-all cursor-pointer",
                expanded
                    ? "border-yellow-400"
                    : "border-white/10 hover:border-yellow-400/50"
            )}
            onClick={() => setExpanded(!expanded)}
        >
            <div
                className={cn(
                    "w-12 h-12 flex items-center justify-center mb-6 transition-colors",
                    expanded ? "bg-yellow-400" : "bg-yellow-400/10"
                )}
            >
                <Icon
                    className={cn(
                        "w-6 h-6 transition-colors",
                        expanded ? "text-black" : "text-yellow-400"
                    )}
                />
            </div>

            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    {title}
                </h3>
                <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                    <ChevronDown className="w-4 h-4 text-yellow-400" />
                </motion.div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed">{description}</p>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-yellow-400/80 leading-relaxed italic">
                            {detail}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({
                          year,
                          title,
                          desc,
                          detail,
                          isLast,
                      }: TimelineItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "relative pl-12 pb-12 border-l border-white/10 group cursor-pointer",
                isLast && "pb-0"
            )}
            onClick={() => setOpen(!open)}
        >
            <div
                className={cn(
                    "absolute left-[-5px] top-0 w-[9px] h-[9px] border-2 border-black rounded-full transition-all",
                    open
                        ? "bg-yellow-400 scale-125"
                        : "bg-white/20 group-hover:bg-yellow-400"
                )}
            />

            <div className="text-yellow-400 font-bold text-2xl mb-1">{year}</div>

            <div className="flex items-center justify-between">
                <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-2">
                    {title}
                </h4>
                <motion.div animate={{ rotate: open ? 45 : 0 }} className="mr-4">
                    <ChevronRight className="w-4 h-4 text-yellow-400/50" />
                </motion.div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 p-4 bg-yellow-400/5 border-l-2 border-yellow-400 text-xs text-white/60 leading-relaxed">
                            {detail}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Archive Link ─────────────────────────────────────────────────────────────

function ArchiveLink({ href, children }: ArchiveLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-yellow-400 border-b border-yellow-400/20 hover:border-yellow-400 transition-all pb-0.5 mt-2 group text-sm"
        >
            {children}
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
    );
}

// ─── Archive Feed Modal ───────────────────────────────────────────────────────

function ArchiveFeedModal({ open, onClose }: ArchiveFeedModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative z-10 bg-black border border-yellow-400/40 max-w-2xl w-full p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-yellow-400 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                Archive Feed // July 13, 1999 — Alpe d&apos;Huez Stage 10
              </span>
                        </div>

                        <div className="aspect-video bg-white/5 border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
                            <div className="text-center">
                                <Play className="w-12 h-12 text-yellow-400 mx-auto mb-3 opacity-60" />
                                <p className="text-white/30 text-xs uppercase tracking-widest">
                                    Helicopter Broadcast Feed
                                </p>
                                <a
                                    href="https://www.youtube.com/watch?v=S2807f4n_6U"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                >
                                    Watch on YouTube →
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-white/60 leading-relaxed">
                            <p>
                                Giuseppe Guerini, riding for Deutsche Telekom, was making his
                                solo ascent of the legendary Alpe d&apos;Huez climb. With only
                                meters to go, he collided with a spectator who had stepped into
                                the road while operating a camera.
                            </p>
                            <p className="text-yellow-400/80 italic border-l-2 border-yellow-400/30 pl-4">
                                &quot;The fan is so absorbed in the act of seeing through the
                                lens that he loses the ability to see the physical reality of
                                the road.&quot; — Contemporary media analysis, 2003
                            </p>
                            <p>
                                Guerini remounted and still won the stage. The image of the
                                collision was broadcast to over 120 countries and became one of
                                the defining moments of 1990s cycling media history.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── Visual Compression Grid ──────────────────────────────────────────────────

interface Era {
    year: string;
    tech: string;
    delay: string;
    reach: string;
    detail: string;
}

function VisualCompressionGrid() {
    const [selected, setSelected] = useState<Era | null>(null);

    const eras: Era[] = [
        {
            year: "1903",
            tech: "Glass plate negative",
            delay: "3–7 days",
            reach: "France only",
            detail:
                "L'Auto newspaper published grainy photographs days after each stage. Fans experienced the race entirely through text dispatches and the occasional blurred image. The race and its documentation were entirely separate events.",
        },
        {
            year: "1952",
            tech: "Film reel broadcast",
            delay: "24 hours",
            reach: "National TV",
            detail:
                "French state television began broadcasting highlight reels the following evening. For the first time, fans not physically present could watch moving images of the race — but always with a day's delay. The event existed before the record.",
        },
        {
            year: "1999",
            tech: "Live satellite uplink",
            delay: "50ms (live)",
            reach: "1B+ viewers",
            detail:
                "The race is now simultaneous with its global broadcast. A fan on Alpe d'Huez knows they are live on television in 120 countries. This is the moment the spectator becomes a performer. Guerini's crash and the fan's camera are the same event.",
        },
        {
            year: "2024",
            tech: "4K HDR + 360° on-board",
            delay: "Real-time + VOD",
            reach: "Global + algorithmic",
            detail:
                'Every spectator is a broadcaster. A fan\'s 15-second clip can reach millions within minutes. The race is no longer one broadcast — it\'s millions of simultaneous feeds. The "official" view competes with infinite unofficial ones.',
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                {eras.map((era, i) => (
                    <motion.div
                        key={era.year}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                            setSelected(selected?.year === era.year ? null : era)
                        }
                        className={cn(
                            "aspect-square p-4 flex flex-col justify-between cursor-pointer transition-all border",
                            i === 3
                                ? "bg-yellow-400 text-black border-yellow-400"
                                : "bg-white/5 border-white/10",
                            selected?.year === era.year && i !== 3 ? "border-yellow-400" : ""
                        )}
                    >
            <span
                className={cn(
                    "text-[10px] font-black",
                    i === 3 ? "text-black" : "text-yellow-400"
                )}
            >
              {era.year}
            </span>
                        <div
                            className="h-px w-full"
                            style={{
                                background:
                                    i === 3 ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.1)",
                            }}
                        />
                        <p
                            className={cn(
                                "text-[8px] uppercase leading-tight font-bold",
                                i === 3 ? "text-black" : "text-white/50"
                            )}
                        >
                            {era.tech}
                            <br />
                            {era.delay}
                        </p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-yellow-400/5 border border-yellow-400/30 border-t-0">
                            <div className="flex justify-between items-start mb-2">
                <span className="text-yellow-400 font-black text-lg">
                  {selected.year}
                </span>
                                <div className="text-right">
                                    <div className="text-[10px] text-white/30 uppercase tracking-widest">
                                        {selected.delay}
                                    </div>
                                    <div className="text-[10px] text-yellow-400/60 uppercase tracking-widest">
                                        {selected.reach}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed">
                                {selected.detail}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Exhibit Interactive ──────────────────────────────────────────────────────

function ExhibitInteractive() {
    const [stage, setStage] = useState(0);
    const [direction, setDirection] = useState(1);

    const stages = [
        {
            year: "1903",
            label: "The Witness",
            desc: "Static, text-heavy reporting. The fan is a physical witness with no lens mediation.",
            color: "border-white/20",
            bg: "bg-transparent",
            viz: (
                <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
                    <div className="text-[9px] font-mono text-white/30 uppercase text-center leading-loose tracking-widest border border-white/10 p-4 w-full">
                        <div className="text-yellow-400/50 mb-2">
                            L&apos;AUTO — JULY 19, 1903
                        </div>
                        <div>Stage results arriving by telegram.</div>
                        <div>Garin leads. No images available.</div>
                        <div className="mt-2 text-white/20">██████████████ ██████</div>
                        <div className="text-white/20">████████ ██████████████</div>
                    </div>
                </div>
            ),
        },
        {
            year: "1952",
            label: "The Film Reel",
            desc: "Delayed broadcast. The fan experiences the race as history, not as event.",
            color: "border-white/20",
            bg: "bg-transparent",
            viz: (
                <div className="flex items-center justify-center h-full gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <div
                                    key={j}
                                    className={cn(
                                        "w-8 h-8 border border-white/20 flex items-center justify-center text-[6px] text-white/20",
                                        i === 2 && j === 1
                                            ? "bg-white/10 border-yellow-400/30"
                                            : ""
                                    )}
                                >
                                    {i === 2 && j === 1 ? (
                                        <span className="text-yellow-400/60">▶</span>
                                    ) : (
                                        "▪"
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            year: "1999",
            label: "The Performer",
            desc: "Live satellite feed. The fan stares into a viewfinder — and becomes part of the broadcast.",
            color: "border-yellow-400/50",
            bg: "bg-yellow-400/5",
            viz: (
                <div className="relative flex items-center justify-center h-full">
                    <div className="relative">
                        <div className="w-20 h-16 border-4 border-yellow-400/60 rounded-sm relative">
                            <div className="absolute inset-2 border border-yellow-400/30 rounded-sm" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full border-2 border-yellow-400 animate-ping opacity-70" />
                            </div>
                        </div>
                        <div className="absolute -top-3 -right-3 w-4 h-4 bg-red-500 rounded-full animate-pulse text-[6px] text-white flex items-center justify-center font-bold">
                            ●
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-yellow-400/60 uppercase">
                        LIVE • 120 COUNTRIES
                    </div>
                </div>
            ),
        },
        {
            year: "2024",
            label: "The Broadcaster",
            desc: "Total immersion. Every fan is a node in the network. Content, not witness.",
            color: "border-white/20",
            bg: "bg-white/5",
            viz: (
                <div className="flex items-center justify-center h-full">
                    <div className="grid grid-cols-4 gap-1.5 w-full px-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="aspect-square rounded-sm"
                                animate={{
                                    backgroundColor: [
                                        "rgba(250,204,21,0.2)",
                                        "rgba(250,204,21,0.6)",
                                        "rgba(250,204,21,0.2)",
                                    ],
                                }}
                                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    const advance = (dir: number) => {
        setDirection(dir);
        setStage((s) => (s + dir + stages.length) % stages.length);
    };

    return (
        <div className="bg-white/5 border border-white/10 p-6 h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">
            Exhibit 04 // Interactive
          </span>
                    <div className="flex gap-1">
                        {stages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > stage ? 1 : -1);
                                    setStage(i);
                                }}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    i === stage
                                        ? "bg-yellow-400 scale-125"
                                        : "bg-white/20 hover:bg-yellow-400/50"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={stage}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className={cn(
                                "aspect-video mb-4 border transition-all overflow-hidden",
                                stages[stage].color,
                                stages[stage].bg
                            )}
                        >
                            {stages[stage].viz}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-wide">
                            {stages[stage].year}: {stages[stage].label}
                        </h4>
                        <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
                            {stages[stage].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => advance(-1)}
                    className="flex-1 py-2 border border-white/20 text-white/50 font-bold text-[10px] uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                >
                    ← Prev
                </button>
                <button
                    onClick={() => advance(1)}
                    className="flex-1 py-2 bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Next Epoch →
                </button>
            </div>
        </div>
    );
}

// ─── Fan Behavior Section ─────────────────────────────────────────────────────

interface TabData {
    label: string;
    period: string;
    color: string;
    desc: string;
    detail: string;
    stats: { label: string; val: string }[];
}

function FanBehaviorSection() {
    const [activeTab, setActiveTab] = useState<"witness" | "perform" | "record">(
        "witness"
    );

    const tabs: Record<string, TabData> = {
        witness: {
            label: "Witnessing",
            period: "1900–1980",
            color: "bg-white/10",
            desc: "The fan as physical presence. No mediation, no lens. Being there was the only form of participation. Fandom was expressed through proximity: standing by the roadside, cheering, waving a flag.",
            detail:
                'In early Tour editions, crowds were simply present. There was no concept of "performing" for an audience because no global audience existed. The fan and the athlete shared the same physical space with no intermediary layer.',
            stats: [
                { label: "Primary medium", val: "Physical presence" },
                { label: "Broadcast reach", val: "Local only" },
                { label: "Fan agency", val: "Passive witness" },
            ],
        },
        perform: {
            label: "Performing",
            period: "1990–2010",
            color: "bg-yellow-400/10",
            desc: "The fan as performer. The global television lens transforms the roadside into a stage. The Guerini incident (1999) is the defining moment: the fan's camera becomes a prop in someone else's broadcast.",
            detail:
                "With satellite TV bringing mountain stages into 1 billion homes, fans began dressing in costumes, painting bodies, and positioning themselves at points where cameras would slow down. Being seen became as important as seeing.",
            stats: [
                { label: "Primary medium", val: "Broadcast Television" },
                { label: "Broadcast reach", val: "1B+ viewers" },
                { label: "Fan agency", val: "Incidental subject" },
            ],
        },
        record: {
            label: "Recording",
            period: "2010–Now",
            color: "bg-yellow-400/20",
            desc: "The fan as broadcaster. Every smartphone is a production studio. Fans no longer perform for the official cameras — they compete with them. The hierarchy of vision has been dissolved.",
            detail:
                "By 2024, an estimated 80% of spectators at major Tour climbs are holding a device. They upload instantly. A fan's clip of a crash can circulate globally before the official broadcast has processed it. The event is fractured into millions of simultaneous narratives.",
            stats: [
                { label: "Primary medium", val: "Smartphone + Social" },
                { label: "Broadcast reach", val: "Algorithmic / infinite" },
                { label: "Fan agency", val: "Active producer" },
            ],
        },
    };

    const current = tabs[activeTab];

    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-8">
                {Object.entries(tabs).map(([key, tab]) => (
                    <button
                        key={key}
                        onClick={() =>
                            setActiveTab(key as "witness" | "perform" | "record")
                        }
                        className={cn(
                            "px-4 py-2 font-bold text-[10px] uppercase tracking-widest transition-all border",
                            activeTab === key
                                ? "bg-yellow-400 text-black border-yellow-400"
                                : "border-white/20 text-white/50 hover:border-yellow-400/50 hover:text-yellow-400"
                        )}
                    >
                        {tab.label}{" "}
                        <span className="opacity-60 ml-1">({tab.period})</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={cn("p-6 border border-white/10 mb-4", current.color)}>
                        <p className="text-white/70 leading-relaxed mb-4">{current.desc}</p>
                        <p className="text-sm text-white/40 leading-relaxed italic border-l-2 border-yellow-400/30 pl-4">
                            {current.detail}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {current.stats.map((s) => (
                            <div
                                key={s.label}
                                className="p-3 bg-white/5 border border-white/10"
                            >
                                <div className="text-[9px] text-white/30 uppercase tracking-widest mb-1">
                                    {s.label}
                                </div>
                                <div className="text-xs text-yellow-400 font-bold">{s.val}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="bg-black text-white selection:bg-yellow-400 selection:text-black">
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-yellow-400 z-[60] origin-left"
                style={{ scaleX }}
            />

            <Navbar />
            <ArchiveFeedModal open={modalOpen} onClose={() => setModalOpen(false)} />

            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative h-[90vh] flex flex-col justify-end px-6 md:px-20 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541625602330-2277a4c4b06d?q=80&w=2070&auto=format&fit=crop"
                        alt="Cycling Peloton"
                        className="w-full h-full object-cover opacity-20 grayscale blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-px w-20 bg-yellow-400" />
                            <span className="text-yellow-400 font-bold text-xs tracking-[0.5em] uppercase">
                Visual Artifact 01-1999
              </span>
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-bold text-white leading-[1.1] md:leading-none mb-8 uppercase tracking-tighter font-display">
                            Through the <br />
                            <span className="text-yellow-400 italic">Viewfinder</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white/50 italic max-w-3xl leading-snug">
                            Investigating the collision between physical athletics and the
                            digital gaze at the 1999 Tour de France.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 right-20 hidden md:flex flex-col items-center gap-4"
                >
          <span
              className="text-[10px] font-bold tracking-widest uppercase text-white/30"
              style={{ writingMode: "vertical-rl" }}
          >
            Scroll to Explore
          </span>
                    <div className="w-px h-24 bg-gradient-to-b from-yellow-400 to-transparent" />
                </motion.div>
            </section>

            <main className="max-w-7xl mx-auto px-6 md:px-20 space-y-40 py-40">
                {/* ── Section 1: The Crash ────────────────────────────────────────── */}
                <section id="incident" className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
                    <div className="md:col-span-5">
                        <SectionHeading label="Historical Flashpoint">
                            Alpe d&apos;Huez <br /> July 1999
                        </SectionHeading>
                        <div className="space-y-6 text-lg text-white/50 leading-relaxed">
                            <p>
                                Giuseppe Guerini was alone on the 21st switchback. The finish
                                line was so close he could smell the champagne. Then, a blur of
                                blue cotton.
                            </p>
                            <p>
                                A fan, staring intently into a viewfinder, stepped into the
                                road. He wasn&apos;t there to watch the race; he was there to{" "}
                                <span className="text-white italic">capture</span> it.
                            </p>
                            <ArchiveLink href="https://www.youtube.com/watch?v=S2807f4n_6U">
                                View Original Helicopter Feed
                            </ArchiveLink>
                        </div>
                    </div>

                    <div className="md:col-span-7">
                        <div
                            onClick={() => setModalOpen(true)}
                            className="relative aspect-video bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden cursor-pointer hover:border-yellow-400 transition-all"
                        >
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Live Archive Feed // 1999
                </span>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"
                                alt="Camera"
                            />
                            <div className="absolute inset-0 bg-yellow-400/5 group-hover:bg-yellow-400/10 transition-colors mix-blend-overlay" />
                            <div className="relative z-10 text-center p-8 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-20 h-20 border border-yellow-400/50 rounded-full flex items-center justify-center mx-auto mb-4 bg-black/40 backdrop-blur-sm group-hover:bg-yellow-400/10 transition-colors">
                                    <Play className="w-8 h-8 text-yellow-400" />
                                </div>
                                <p className="text-white font-bold text-2xl uppercase tracking-widest">
                                    &quot;The lens became a wall.&quot;
                                </p>
                                <p className="text-yellow-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                                    Click to Open Archive
                                </p>
                            </div>
                            <div className="absolute bottom-4 right-4 z-20 text-[8px] text-white/30 font-mono">
                                TC 10:42:15:08
                            </div>
                        </div>

                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                            <div className="p-6 border-l border-yellow-400/30 bg-yellow-400/5 italic text-sm text-white/50 leading-relaxed">
                                &quot;The fan is so absorbed in the act of seeing through the
                                lens that he loses the ability to see the physical reality of
                                the road.&quot;
                            </div>
                            <div className="p-6 border border-white/10 bg-white/5">
                <span className="block text-[10px] font-bold text-yellow-400 uppercase mb-2">
                  The Impact
                </span>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    Guerini hit the pavement, his carbon-fiber frame clattering
                                    against asphalt. Broadcast to 120 countries, it was the moment
                                    crowd management changed forever.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 2: Tech ─────────────────────────────────────────────── */}
                <section id="tech" className="grid md:grid-cols-12 gap-20">
                    <div className="md:col-span-7 order-2 md:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FeatureCard
                                icon={Layers}
                                title="Satellite Era"
                                delay={0}
                                description="The 1990s saw a massive surge in international broadcast rights as technology allowed for real-time mountain tracking."
                                detail="By 1999, ASO (Amaury Sport Organisation) had signed broadcast deals with networks in over 170 countries. The satellite infrastructure meant every mountain stage was live globally — a technical miracle that transformed the event's economics and its culture."
                            />
                            <FeatureCard
                                icon={Navigation2}
                                title="Moto-Cams"
                                delay={0.1}
                                description="Lightweight cameras on motorcycles turned the three-week race into a 2,000-mile live studio."
                                detail="The introduction of gyro-stabilized cameras on motorcycles in the late 1980s allowed French director Jean-François Gautier to pioneer the close-following shot style that defined 1990s Tour coverage. The motorcycle became an invisible third competitor."
                            />
                            <FeatureCard
                                icon={Tv}
                                title="Global Feed"
                                delay={0.2}
                                description="For the first time, a spectator standing on a hairpin turn wasn't just watching a race—they were on television."
                                detail="This feedback loop — fan watching camera watching fan — produced entirely new behaviors. Fans began to position themselves at predictable camera angles. Costumes, props, painted bodies: the mountain became a stage set."
                            />
                            <FeatureCard
                                icon={Info}
                                title="Archive Data"
                                delay={0.3}
                                description="Media historian Daam Van Reeth notes that this decade saw a massive surge in broadcast rights values."
                                detail="Van Reeth's research (2022) documents that Tour broadcast rights values increased by over 400% between 1985 and 2000, tracking precisely with satellite distribution's global expansion. The sport's identity became inseparable from its broadcast image."
                            />
                        </div>
                        <div className="mt-12">
                            <ArchiveLink href="https://doi.org/10.1080/09523360312331360340">
                                Source: Van Reeth (2022) Economic History Research
                            </ArchiveLink>
                        </div>
                    </div>

                    <div className="md:col-span-5 order-1 md:order-2">
                        <SectionHeading
                            label="Infrastructure"
                            subtitle="How the lens arrived at the mountain."
                        >
                            The Live <br /> Studio
                        </SectionHeading>
                        <div className="mt-12">
                            <TimelineItem
                                year="1948"
                                title="First Broadcast"
                                desc="Static cameras at the finish line. The race remains mostly invisible to the global public."
                                detail="French state broadcaster RTF placed a single camera at the Parc des Princes velodrome. Only the final sprint was captured. The mountain climbs — the soul of the race — were entirely undocumented."
                            />
                            <TimelineItem
                                year="1985"
                                title="Satellite Leap"
                                desc="Full satellite distribution across Europe. Live mountain footage becomes technically feasible."
                                detail="The introduction of helicopter-mounted cameras and satellite uplinks changed everything. For the first time, a viewer in Germany could watch a climb on Alpe d'Huez in real-time. Viewership tripled within three years."
                            />
                            <TimelineItem
                                year="1999"
                                title="Critical Mass"
                                isLast
                                desc="Global reach exceeds 1 billion viewers. The spectator is now a broadcast subject."
                                detail="The Guerini incident crystallizes a transformation that had been building for a decade. The fan with a camera is not an anomaly — he is the logical endpoint of a system that turned every roadside into a broadcast set."
                            />
                        </div>
                    </div>
                </section>

                {/* ── Section 2.5: Visual Compression ────────────────────────────── */}
                <section className="relative overflow-hidden border-y border-white/10 py-20 bg-white/[0.02]">
                    <div className="flex flex-col md:flex-row items-start gap-12 max-w-7xl mx-auto px-6">
                        <div className="w-full md:w-1/2">
                            <VisualCompressionGrid />
                        </div>
                        <div className="w-full md:w-1/2">
                            <SectionHeading
                                label="Evolution of Sight"
                                subtitle="Click any era to explore it. From frozen moments to fluid reality."
                            >
                                The Visual <br /> Compression
                            </SectionHeading>
                            <p className="text-white/50 text-lg leading-relaxed mb-8">
                                In 1903, the fan had to wait days for a grain-heavy photo in{" "}
                                <i>L&apos;Auto</i>. By 1999, the fan was part of the
                                50-millisecond delay of a global satellite uplink. The distance
                                between the event and the record has collapsed.
                            </p>
                            <ArchiveLink href="https://gallica.bnf.fr/ark:/12148/cb328023051/date">
                                Gallica BnF Archive
                            </ArchiveLink>
                        </div>
                    </div>
                </section>

                {/* ── Section 3: Performance ──────────────────────────────────────── */}
                <section id="performance" className="relative py-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-yellow-400/[0.02] -skew-y-3 z-0" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto mb-24">
                        <SectionHeading label="Anthropology of Fandom">
                            The Performance of Being Seen
                        </SectionHeading>
                        <Quote className="w-12 h-12 text-yellow-400/20 mx-auto mb-8" />
                        <blockquote className="text-3xl md:text-5xl italic text-white leading-tight mb-8">
                            &quot;The Tour shifted from a &apos;live event&apos; experienced
                            roadside to a &apos;media event&apos; designed for{" "}
                            <span className="text-yellow-400 underline decoration-1 underline-offset-8">
                television audiences
              </span>
                            .&quot;
                        </blockquote>
                        <cite className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
                            — F. Wille, 2003 Archive
                        </cite>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-3 gap-8 mb-16">
                        <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group hover:border-yellow-400 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <Users className="w-20 h-20 text-yellow-400" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4 uppercase">
                                    The Crazed Fan
                                </h4>
                                <p className="text-white/50 leading-relaxed mb-6">
                                    One of the most durable figures in this history is the fan who
                                    runs alongside the riders. In the 90s, this behavior peaked,
                                    becoming a recognized &quot;type&quot; in popular culture.
                                </p>
                                <ArchiveLink href="https://reuters.com/sports/cycling/tour-de-france-fans-warned-be-careful-after-recent-accidents-2023-07-16/">
                                    View Incident Reports
                                </ArchiveLink>
                            </div>

                            <div className="p-10 bg-white/5 border border-white/10 relative overflow-hidden group hover:border-yellow-400 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-20 h-20 text-yellow-400" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4 uppercase">
                                    Visual Scouting
                                </h4>
                                <p className="text-white/50 leading-relaxed mb-6">
                                    Fans began to &quot;scout&quot; locations where motorcycles
                                    would be forced to slow down. They weren&apos;t just waving at
                                    the riders — they were waving into the lens.
                                </p>
                                <ArchiveLink href="https://www.ina.fr/recherche?q=Tour+de+France+1999">
                                    INA French Archives (1999)
                                </ArchiveLink>
                            </div>
                        </div>

                        <div className="bg-yellow-400 p-12 text-black flex flex-col justify-between">
                            <div>
                                <Info className="w-8 h-8 mb-6" />
                                <h4 className="text-3xl font-bold uppercase leading-none mb-4">
                                    Deep Context
                                </h4>
                                <p className="text-sm font-bold leading-relaxed mb-6">
                                    The early issues of L&apos;Auto (1903) describe
                                    &quot;theatrical&quot; spectators. But the 1990s monetized
                                    this impulse. The camera gave the spectator a global audience
                                    that the 1903 fan could only dream of.
                                </p>
                            </div>
                            <div className="text-[10px] font-black tracking-widest uppercase">
                                Museum Label 3B // 2026
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 4: Now ──────────────────────────────────────────────── */}
                <section id="now" className="grid md:grid-cols-2 gap-20 items-start">
                    <div>
                        <SectionHeading
                            label="Evolution"
                            subtitle="Click each era to expand. The Viewfinder to the Smartphone."
                        >
                            The Modern <br /> Mirror
                        </SectionHeading>
                        <div className="space-y-8 text-lg text-white/50 leading-relaxed mb-10">
                            <p>
                                If the 1990s was the era of being{" "}
                                <span className="text-white">seen by</span> the camera, the
                                2020s is the era of{" "}
                                <span className="text-white">seeing through</span> the camera.
                            </p>
                            <p className="text-base">
                                The Guerini incident of 1999 was a precursor to a world where
                                every spectator carries a high-definition broadcast studio in
                                their pocket.
                            </p>
                        </div>
                        <FanBehaviorSection />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="aspect-[3/4] bg-white/5 border border-white/10 p-6 flex flex-col justify-between group overflow-hidden relative hover:border-yellow-400 transition-colors">
                            <Smartphone className="w-12 h-12 text-yellow-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div>
                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-loose mb-4">
                                    COMPARISON WALL
                                </p>
                                <div className="space-y-3">
                                    <div className="p-3 border border-white/10 bg-white/5">
                                        <div className="text-[9px] text-yellow-400/60 uppercase mb-1">
                                            1999 Viewfinder
                                        </div>
                                        <div className="text-[10px] text-white/50">
                                            Minolta Vectis S-1 APS film camera. 22–80mm lens.
                                            Single-use roll. Results: 24–36 photos per roll.
                                        </div>
                                    </div>
                                    <div className="p-3 border border-yellow-400/30 bg-yellow-400/5">
                                        <div className="text-[9px] text-yellow-400 uppercase mb-1">
                                            2024 iPhone 15 Pro
                                        </div>
                                        <div className="text-[10px] text-white/50">
                                            48MP sensor. 4K/120fps ProRes. Instant global upload.
                                            Infinite shots. Built-in broadcast studio.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ExhibitInteractive />
                    </div>
                </section>
            </main>

            {/* ── Footer ──────────────────────────────────────────────────────────── */}
            <footer className="px-6 md:px-20 py-20 border-t border-white/10 bg-white/[0.02] flex justify-center">
                <div className="max-w-7xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-yellow-400 flex items-center justify-center font-bold text-black text-sm">
                                W
                            </div>
                            <span className="text-lg tracking-wider text-white font-bold">
                THE ARCHIVE
              </span>
                        </div>
                        <p className="text-xs text-white/30 leading-relaxed uppercase tracking-widest">
                            A digital research exhibit exploring the intersection of media and
                            athletics.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-yellow-400 tracking-[0.3em] uppercase">
                            Project Info
                        </h5>
                        <ul className="text-xs text-white/30 space-y-2 uppercase tracking-widest">
                            <li>English 102: Archival Research</li>
                            <li>Cameron Wilson</li>
                            <li>February 2026</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-yellow-400 tracking-[0.3em] uppercase">
                            Archive Sources
                        </h5>
                        <ul className="text-xs text-white/30 space-y-2 uppercase tracking-widest">
                            <li>
                                <a
                                    href="https://gallica.bnf.fr/ark:/12148/cb328023051/date"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    L&apos;Auto Digital Archives (1903–1944)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.ina.fr/recherche?q=Tour+de+France"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    INA France Media Archive
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.worldcat.org/title/cycle-sport"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Cycle Sport Mag Repository
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">
                        © 2026 Digital Research Collective
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-[10px] text-yellow-400 uppercase font-bold tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
                    >
                        Back to Top{" "}
                        <Navigation2 className="w-3 h-3 -rotate-45" />
                    </button>
                </div>
            </div>
        </footer>
        </div>
    );
}