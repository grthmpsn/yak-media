import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Section } from '../components/Section';
import { articles } from '../data/articles';

export function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const articleIndex = articles.findIndex(a => a.slug === slug);
    const article = articles[articleIndex];

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-display font-bold mb-4">Article Not Found</h1>
                <Link to="/insights" className="text-accent hover:underline">Back to Insights</Link>
            </div>
        );
    }

    const nextArticle = articles[(articleIndex + 1) % articles.length];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Image */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <img
                    src={article.heroImg}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
            </section>

            {/* Article Content */}
            <Section className="relative -mt-32 z-10 pt-0 pb-20">
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4" />
                            All Insights
                        </Link>
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                            {article.category}
                        </span>
                        <span className="text-sm text-white/40 flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />{article.readTime}
                        </span>
                        <span className="text-sm text-white/40">{article.date}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-12 leading-[1.1]"
                    >
                        {article.title}
                    </motion.h1>

                    {/* Body */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {article.content.map((paragraph, idx) => {
                            // Handle markdown-style headers
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={idx} className="text-2xl md:text-3xl font-display font-bold mt-12 mb-4">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            // Handle bold-prefixed paragraphs (like list items)
                            if (paragraph.startsWith('**')) {
                                const match = paragraph.match(/^\*\*(.+?)\*\*\s*[—–-]\s*(.*)/);
                                if (match) {
                                    return (
                                        <div key={idx} className="flex gap-4 pl-4 border-l-2 border-accent/20">
                                            <div>
                                                <span className="font-medium text-white">{match[1]}</span>
                                                <span className="text-white/60"> — {match[2]}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            }
                            return (
                                <p key={idx} className="text-lg text-white/70 font-light leading-relaxed">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </motion.div>
                </div>
            </Section>

            {/* Next Article */}
            <section className="border-t border-white/10 py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-6">Next Article</p>
                    <Link to={`/insights/${nextArticle.slug}`} className="group flex items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-accent transition-colors">
                                {nextArticle.title}
                            </h3>
                            <p className="text-white/50 mt-2">{nextArticle.category} &middot; {nextArticle.readTime}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
