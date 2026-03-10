import { Instagram, Linkedin, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer role="contentinfo" className="border-t border-white/10 bg-black pt-24 pb-12 relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div className="max-w-xl">
                        <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                            Ready to tell your <br />
                            <span className="text-white/40 italic font-serif">story?</span>
                        </h3>
                        <p className="text-white/60 mb-8 font-light text-lg max-w-md">
                            Committed to delivering services and creating stories in the most sustainable way possible for purpose-led organizations.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 h-12 px-6 text-base group"
                            >
                                Start a Project
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="flex gap-3">
                                <a href="https://instagram.com/yakmedia" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-white group">
                                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-white group">
                                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                                <a href="mailto:info@yakmedia.com" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-white group">
                                    <Mail size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end md:text-right justify-center">
                        <a href="mailto:info@yakmedia.com" className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-display text-white/80 hover:text-white transition-colors mb-4">
                            info@yakmedia.com
                            <span className="p-2 rounded-full bg-white/10 group-hover:bg-accent group-hover:text-black transition-colors">
                                <ArrowUpRight size={20} />
                            </span>
                        </a>
                        <h4 className="font-display text-xl text-white/50 mb-2">Chamonix-Mont-Blanc</h4>
                        <p className="text-white/30 text-sm">Yak Media ~ Story, Film, Production</p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-sm text-white/40 items-center gap-6">
                    <p>&copy; {new Date().getFullYear()} Yak Media. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-white/80 transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white/80 transition-colors cursor-pointer">Terms of Service</span>
                        <span className="hover:text-white/80 transition-colors cursor-pointer">1% for the Planet</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
