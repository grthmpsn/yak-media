import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Section } from '../components/Section';
import { projects } from '../data/projects';
import { usePageSEO } from '../hooks/usePageSEO';

const serviceFilters = ["All", "Production", "Story Research", "Story Building", "Editing", "Filming"] as const;

export function Work() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilter = searchParams.get('service') || 'All';
    const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

    usePageSEO({
        title: 'Our Work — Brand Films & Documentaries',
        description: 'Explore our portfolio of brand films, documentaries, and adventure content. From Arc\'teryx to Gore-Tex, see how we tell stories sustainably from Chamonix.',
    });

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.services.includes(activeFilter));

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        if (filter === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ service: filter });
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Page Header */}
            <section className="pt-40 pb-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Our Work</h1>
                        <p className="text-xl text-white/60 font-light max-w-2xl">
                            From brand films and documentaries to full-scale production in extreme environments. A decade of stories told sustainably.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter + Grid */}
            <Section className="pt-8 pb-32">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {serviceFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterChange(filter)}
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

                {/* Results count */}
                <p className="text-sm text-white/40 mb-8">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    {activeFilter !== 'All' && <> in <span className="text-white/60">{activeFilter}</span></>}
                </p>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((work) => (
                            <motion.div
                                key={work.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link to={`/work/${work.slug}`} className="group block">
                                    <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-5 relative">
                                        <img src={work.img} alt={`${work.title} — ${work.brand}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-3 right-3">
                                            <span className="px-2.5 py-1 rounded-full text-xs bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
                                                {work.year}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-display font-medium mb-1.5 group-hover:text-accent transition-colors">{work.title}</h3>
                                            <p className="text-white/50 text-sm mb-3">{work.brand}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {work.services.map((s) => (
                                                    <span key={s} className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 text-white/40 border border-white/10">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0 mt-1">
                                            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Section>
        </div>
    );
}
