import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Film, Map, Heart, Clock, Camera, Scissors, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Showreel } from '../components/Showreel';
import { projects } from '../data/projects';
import { articles } from '../data/articles';

const brands = [
    { name: "Arc'teryx", logo: "/logos/arcteryx.svg" },
    { name: "The North Face", logo: "/logos/thenorthface.svg" },
    { name: "Gore-Tex", logo: "/logos/goretex.svg" },
    { name: "Yeti", logo: "/logos/yeti.svg" },
    { name: "Garmin", logo: "/logos/garmin.svg" },
    { name: "Adobe", logo: "/logos/adobe.svg" },
    { name: "Mammut", logo: "/logos/mammut.svg" },
    { name: "Columbia", logo: "/logos/columbia.svg" },
    { name: "Hermès", logo: "/logos/hermes.svg" },
    { name: "Paul Smith", logo: "/logos/paulsmith.svg" },
    { name: "Nivea", logo: "/logos/nivea.svg" },
    { name: "ISDIN", logo: "/logos/isdin.svg" },
    { name: "Stance", logo: "/logos/stance.svg" },
    { name: "Santara", logo: "/logos/santara.svg" },
    { name: "TCO", logo: "/logos/tco.svg" },
    { name: "Coldhouse Collective", logo: "/logos/coldhouse.svg" },
    { name: "Run The Alps", logo: "/logos/runthealps.svg" },
    { name: "Kendal Mountain Festival", logo: "/logos/kendalmountain.svg" },
    { name: "Alpine Run Project", logo: "/logos/alpinerun.svg" },
    { name: "Luja Studio", logo: "/logos/luja.svg" },
    { name: "Global Citizen", logo: "/logos/globalcitizen.svg" },
    { name: "Megève", logo: "/logos/megeve.svg" },
    { name: "1% For The Planet", logo: "/logos/onepercent.svg" },
];

const serviceFilters = ["All", "Production", "Story Research", "Story Building", "Editing", "Filming"] as const;

const services = [
    { title: "Production Services", slug: "Production", icon: "Film", desc: "Full-scale sustainable production management for commercial and documentary projects in extreme environments." },
    { title: "Story Research", slug: "Story Research", icon: "Map", desc: "Uncovering unique narratives and authentic characters within the outdoor and action sports industry." },
    { title: "Story Building", slug: "Story Building", icon: "Heart", desc: "Crafting compelling narratives that inspire, engage audiences, and align with purpose-led brand goals." },
    { title: "Editing", slug: "Editing", icon: "Scissors", desc: "Award-winning post-production editing, bringing footage from raw elements to a polished, captivating final piece." },
    { title: "Filming", slug: "Filming", icon: "Camera", desc: "On-location cinematography by a team experienced in operating in challenging alpine and remote conditions." },
];

const serviceIcons: Record<string, React.ReactNode> = {
    Film: <Film className="w-8 h-8 text-accent" />,
    Map: <Map className="w-8 h-8 text-accent" />,
    Heart: <Heart className="w-8 h-8 text-accent" />,
    Scissors: <Scissors className="w-8 h-8 text-accent" />,
    Camera: <Camera className="w-8 h-8 text-accent" />,
};

// Use the first project with a Vimeo ID as the hero background video
const heroVideoId = projects.find(p => p.vimeoId)?.vimeoId || '817278847';

export function Home() {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [showreelOpen, setShowreelOpen] = useState(false);
    const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
    const [heroIndex, setHeroIndex] = useState(0);
    const workRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.services.includes(activeFilter));

    const handleServiceClick = (slug: string) => {
        setActiveFilter(slug);
        workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Cycle hero background images (fallback while video loads)
    const heroImages = projects.slice(0, 5);
    const nextHeroImage = useCallback(() => {
        setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, [heroImages.length]);

    useEffect(() => {
        if (heroVideoLoaded) return;
        const timer = setInterval(nextHeroImage, 5000);
        return () => clearInterval(timer);
    }, [nextHeroImage, heroVideoLoaded]);

    return (
        <div className="flex flex-col w-full">
            {/* Showreel Modal */}
            <Showreel isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />

            {/* Hero Section */}
            <section id="hero" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 bg-black z-0">
                    {/* Fallback cycling images while video loads */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={heroIndex}
                            src={heroImages[heroIndex].img}
                            alt=""
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: heroVideoLoaded ? 0 : 0.5, scale: 1.05 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Vimeo background video */}
                    <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${heroVideoLoaded ? 'opacity-60' : 'opacity-0'}`}>
                        <iframe
                            src={`https://player.vimeo.com/video/${heroVideoId}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&controls=0&dnt=1&quality=720p`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full border-0 pointer-events-none"
                            allow="autoplay; fullscreen"
                            onLoad={() => {
                                setTimeout(() => setHeroVideoLoaded(true), 1500);
                            }}
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10"></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center w-full mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wide text-white/80">Chamonix-Mont-Blanc</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-6 leading-[0.9]"
                    >
                        YAK <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-serif font-light">MEDIA.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-white/70 max-w-2xl text-center mb-12 font-light"
                    >
                        Turning ideas into compelling stories and engaging visual campaigns, sustainably.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="group" onClick={() => navigate('/work')}>
                            View Our Work
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" size="lg" className="group" onClick={() => setShowreelOpen(true)}>
                            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform fill-white/20" />
                            Watch Showreel
                        </Button>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                </motion.div>
            </section>

            {/* About Katie Section */}
            <Section id="about" className="relative z-10 bg-black/60 backdrop-blur-3xl border-y border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        {/* Image Placeholder (Katie & Mowgli) */}
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/5db2f9bc79defe33dc53dce0/1628074522165-MQ8SDS296KGX9HI864HB/KTM_midi.jpg?format=1500w"
                                alt="Katie Moore"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 z-20">
                                <p className="font-display font-medium text-white/90 text-lg">Katie Moore & Mowgli</p>
                                <p className="text-white/50 text-sm">Chamonix, France</p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                            Passion for the <span className="text-accent italic font-serif font-light">Outdoors.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                            <p>
                                Yak Media is run by Katie Moore. With over 20 years experience in creative roles, Katie is a mountain addict and visual storyteller, with in-depth knowledge of the outdoor industry.
                            </p>
                            <p>
                                She has a string of award-winning commercial & documentary production, writing & editing credits and a knack for pulling together the best people in the business. Constantly on the lookout for an unexpected story, she jumps at the chance to tell tales about ordinary people doing extraordinary things.
                            </p>
                            <p>
                                Katie left her home town of Slough to work a ski season and never went back! When not filming, organising or editing, you will likely find her in the mountains with Mowgli the dog.
                            </p>
                        </div>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="font-display text-3xl font-bold text-white mb-1">20+</span>
                                <span className="text-sm text-white/50 tracking-wider uppercase">Years Exp.</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="flex flex-col">
                                <span className="font-display text-3xl font-bold text-white mb-1">100%</span>
                                <span className="text-sm text-white/50 tracking-wider uppercase">Sustainable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Services Section */}
            <Section id="services" className="relative z-10 bg-background">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Services</h2>
                    <p className="text-xl text-white/60 font-light">From creating original films to brand content and production services, we put our passion for adventure into everything we do.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => {
                        const isActive = activeFilter === service.slug;
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                onClick={() => handleServiceClick(service.slug)}
                                className={`p-8 rounded-3xl flex flex-col items-start text-left cursor-pointer transition-colors duration-300 ${
                                    isActive
                                        ? 'bg-accent/10 border-2 border-accent/40'
                                        : 'glass-panel glass-panel-hover'
                                }`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-colors duration-300 ${
                                    isActive ? 'bg-accent/20 border-accent/30' : 'bg-white/5 border-white/10'
                                }`}>
                                    {serviceIcons[service.icon]}
                                </div>
                                <h3 className="text-2xl font-display font-medium mb-4">{service.title}</h3>
                                <p className="text-white/50 font-light leading-relaxed mb-6">{service.desc}</p>
                                <span className={`mt-auto text-sm font-medium flex items-center gap-2 transition-colors ${
                                    isActive ? 'text-accent' : 'text-white/40 group-hover:text-white/60'
                                }`}>
                                    View {service.slug} projects
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </motion.div>
                        );
                    })}

                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => navigate('/contact')}
                        className="p-8 rounded-3xl bg-accent/10 border border-accent/20 flex flex-col items-start justify-center group cursor-pointer"
                    >
                        <h3 className="text-2xl font-display font-medium mb-4 text-accent group-hover:text-accent-light transition-colors">Custom Project?</h3>
                        <p className="text-white/60 font-light leading-relaxed mb-8">Discuss a unique requirement or bespoke production service.</p>
                        <Button variant="outline" className="mt-auto group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                            Let's Talk
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                </div>
            </Section>
            {/* Brand Partners Grid */}
            <Section id="brands" className="py-16 md:py-24 border-t border-white/5 bg-black/40">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-white/40 font-medium">Proud to work with</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-14 items-center justify-items-center">
                    {brands.map((brand, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center justify-center h-10 md:h-12 w-full opacity-40 hover:opacity-100 transition-opacity duration-300"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-full max-w-[130px] md:max-w-[150px] object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Work Showcase Section */}
            <div ref={workRef} id="work">
                <Section className="relative z-10 bg-background pt-32 pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Work</h2>
                            <p className="text-xl text-white/60 font-light max-w-xl">A selection of recent projects highlighting our sustainable approach to storytelling.</p>
                        </div>
                        <Link to="/work" className="shrink-0">
                            <Button variant="outline" className="group">
                                See All
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {serviceFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    activeFilter === filter
                                        ? 'bg-accent text-white'
                                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((work) => (
                                <motion.div
                                    key={work.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link to={`/work/${work.slug}`} className="group block">
                                        <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-6 relative">
                                            <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-display font-medium mb-2 group-hover:text-accent transition-colors">{work.title} for {work.brand}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {work.services.map((s) => (
                                                        <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40 border border-white/10">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </Section>
            </div>

            {/* Insights / Blog Section */}
            <Section id="insights" className="relative z-10 bg-background pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Insights</h2>
                        <p className="text-xl text-white/60 font-light max-w-xl">Perspectives on storytelling, brand building, and sustainable production.</p>
                    </div>
                    <Link to="/insights" className="shrink-0">
                        <Button variant="outline" className="group">
                            All Articles
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.article
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link to={`/insights/${article.slug}`} className="group block h-full">
                                <div className="p-8 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">{article.category}</span>
                                        <span className="text-sm text-white/40 flex items-center gap-1.5"><Clock className="w-3 h-3" />{article.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-display font-medium mb-4 group-hover:text-accent transition-colors leading-tight">{article.title}</h3>
                                    <p className="text-white/50 font-light leading-relaxed text-sm flex-grow">{article.excerpt}</p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs text-white/30">{article.date}</span>
                                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </Section>

            {/* Contact Form Section */}
            <Section id="contact" className="relative z-10 bg-black/40 py-24 md:py-32 border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Let's tell your <span className="text-accent italic font-serif font-light">story.</span>
                        </h2>
                        <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                            Whether you have a clear brief or just an idea, we'd love to hear from you. Tell us about your project and we'll get back to you within 48 hours.
                        </p>
                        <div className="space-y-4 text-white/50">
                            <p className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                info@yakmedia.com
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                Chamonix-Mont-Blanc, France
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-white/60 mb-2">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                placeholder="Your company or brand"
                            />
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-white/60 mb-2">Service of interest</label>
                            <select
                                id="service"
                                name="service"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors appearance-none"
                            >
                                <option value="" className="bg-neutral-900">Select a service</option>
                                <option value="production" className="bg-neutral-900">Production Services</option>
                                <option value="story-research" className="bg-neutral-900">Story Research</option>
                                <option value="story-building" className="bg-neutral-900">Story Building</option>
                                <option value="editing" className="bg-neutral-900">Editing</option>
                                <option value="filming" className="bg-neutral-900">Filming</option>
                                <option value="other" className="bg-neutral-900">Something else</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">Tell us about your project</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors resize-none"
                                placeholder="What's the story you want to tell?"
                            />
                        </div>
                        <Button size="lg" className="w-full sm:w-auto group">
                            Send Message
                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </form>
                </div>
            </Section>

            {/* Purpose CTA Section */}
            <Section className="relative z-10 py-32 border-y border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
                <div className="relative text-center max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-8"
                    >
                        <Heart className="w-10 h-10 text-accent" />
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
                        Working with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">Purpose.</span>
                    </h2>
                    <p className="text-2xl text-white/70 font-light mb-12 leading-relaxed">
                        We are passionate about collaborating with purpose-led organizations, whether that's big outdoor brands or large corporates striving towards meaningful social and environmental change.
                    </p>
                    <Button size="lg" className="shadow-[0_0_40px_rgba(59,130,246,0.3)]" onClick={() => navigate('/contact')}>
                        Let's Change The World
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </Section>
        </div>
    );
}
