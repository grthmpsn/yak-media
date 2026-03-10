import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { projects } from '../data/projects';
import { Section } from '../components/Section';
import { Button } from '../components/Button';

export function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const projectIndex = projects.findIndex(p => p.slug === slug);
    const project = projects[projectIndex];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Project not found</h1>
                    <Link to="/" className="text-accent hover:underline">Back to home</Link>
                </div>
            </div>
        );
    }

    const nextProject = projects[(projectIndex + 1) % projects.length];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Image */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <img
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />

                <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-10">
                    <Link
                        to="/#work"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Work
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-24 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-accent font-medium text-lg mb-3">{project.brand}</p>
                            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">{project.title}</h1>
                            <div className="flex flex-wrap gap-3">
                                {project.services.map((s) => (
                                    <span key={s} className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white/80 border border-white/10">{s}</span>
                                ))}
                                <span className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white/80 border border-white/10">{project.year}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Project Info Bar */}
            <div className="border-b border-white/10 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Client</p>
                            <p className="font-display font-medium text-lg">{project.brand}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Services</p>
                            <p className="font-display font-medium text-lg">{project.services.join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Year</p>
                            <p className="font-display font-medium text-lg">{project.year}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Location</p>
                            <p className="font-display font-medium text-lg">Chamonix, France</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Description */}
            <Section className="py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">The Project</h2>
                        <p className="text-lg text-white/70 font-light leading-relaxed">{project.description}</p>
                    </motion.div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-display font-medium mb-4 text-accent">The Challenge</h3>
                            <p className="text-white/60 font-light leading-relaxed">{project.challenge}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-display font-medium mb-4 text-accent">Our Approach</h3>
                            <p className="text-white/60 font-light leading-relaxed">{project.approach}</p>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Video Embed */}
            {project.vimeoId && (
                <Section className="pb-20 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10"
                    >
                        <iframe
                            src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            title={project.title}
                        />
                    </motion.div>
                </Section>
            )}

            {/* Next Project */}
            <div className="border-t border-white/10">
                <Link to={`/work/${nextProject.slug}`} className="group block">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-widest text-white/40 mb-4">Next Project</p>
                                <h3 className="text-3xl md:text-5xl font-display font-bold group-hover:text-accent transition-colors">
                                    {nextProject.title}
                                </h3>
                                <p className="text-white/50 mt-2 text-lg">{nextProject.brand}</p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
