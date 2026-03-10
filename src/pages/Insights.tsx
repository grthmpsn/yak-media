import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { articles } from '../data/articles';

export function Insights() {
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
                        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Insights</h1>
                        <p className="text-xl text-white/60 font-light max-w-2xl">
                            Perspectives on storytelling, brand building, and sustainable production for marketing leaders.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Article */}
            <Section className="pt-0 pb-12">
                <Link to={`/insights/${articles[0].slug}`} className="group block">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden glass-panel glass-panel-hover"
                    >
                        <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                            <img
                                src={articles[0].heroImg}
                                alt={articles[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                    {articles[0].category}
                                </span>
                                <span className="text-sm text-white/40 flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />{articles[0].readTime}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
                                {articles[0].title}
                            </h2>
                            <p className="text-white/50 font-light leading-relaxed mb-6">{articles[0].excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/30">{articles[0].date}</span>
                                <span className="text-sm font-medium text-white/50 group-hover:text-accent flex items-center gap-2 transition-colors">
                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </Section>

            {/* Article Grid */}
            <Section className="pt-0 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(1).map((article, idx) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                        >
                            <Link to={`/insights/${article.slug}`} className="group block h-full">
                                <div className="rounded-2xl overflow-hidden glass-panel glass-panel-hover h-full flex flex-col">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={article.heroImg}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                                {article.category}
                                            </span>
                                            <span className="text-sm text-white/40 flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />{article.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-display font-medium mb-3 group-hover:text-accent transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-white/50 font-light leading-relaxed text-sm flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-xs text-white/30">{article.date}</span>
                                            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
