import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../components/Button';

export function Contact() {
    return (
        <div className="flex flex-col w-full">
            <section className="pt-40 pb-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column: Header + Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
                                Let's tell your <span className="text-accent italic font-serif font-light">story.</span>
                            </h1>
                            <p className="text-lg text-white/60 font-light max-w-lg mb-10">
                                Whether you have a clear brief or just an idea, we'd love to hear from you. Tell us about your project and we'll get back to you within 48 hours.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1.5">Email</h3>
                                    <a href="mailto:info@yakmedia.com" className="text-white hover:text-accent transition-colors">info@yakmedia.com</a>
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1.5">Location</h3>
                                    <p className="text-white/70">Chamonix-Mont-Blanc, France</p>
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1.5">Social</h3>
                                    <div className="flex gap-4">
                                        <a href="https://vimeo.com/yakmedia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors">Vimeo</a>
                                        <a href="https://instagram.com/yakmedia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors">Instagram</a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl glass-panel">
                                <h3 className="font-display font-medium mb-2">Working with Purpose</h3>
                                <p className="text-white/50 font-light leading-relaxed text-sm">
                                    We are passionate about collaborating with purpose-led organisations. If you have a story that matters, we want to help you tell it.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            onSubmit={(e) => { e.preventDefault(); }}
                            className="space-y-5"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-white/60 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-white/60 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-company" className="block text-sm font-medium text-white/60 mb-2">Company</label>
                                <input
                                    type="text"
                                    id="contact-company"
                                    name="company"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-colors"
                                    placeholder="Your company or brand"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-service" className="block text-sm font-medium text-white/60 mb-2">Service of interest</label>
                                <select
                                    id="contact-service"
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
                                <label htmlFor="contact-message" className="block text-sm font-medium text-white/60 mb-2">Tell us about your project</label>
                                <textarea
                                    id="contact-message"
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
                        </motion.form>
                    </div>
                </div>
            </section>
        </div>
    );
}
