import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            // Anchor link — if we're on the home page, scroll to section
            if (location.pathname === '/') {
                const el = document.querySelector(href);
                el?.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate home then scroll
                navigate('/' + href);
            }
        }
    };

    const navLinks = [
        { name: 'Work', href: '/work' },
        { name: 'Services', href: '#services' },
        { name: 'About Katie', href: '#about' },
        { name: 'Insights', href: '/insights' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl shadow-black/50' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group z-50 shrink-0">
                    <span className="font-display font-extrabold text-3xl tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">YAK<span className="text-accent">.</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-10 items-center ml-16">
                    {navLinks.map((link) => (
                        link.href.startsWith('/') ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ) : (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        )
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white z-50 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
                    >
                        {navLinks.map((link, i) => (
                            link.href.startsWith('/') ? (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                >
                                    <Link
                                        to={link.href}
                                        className="text-4xl font-display font-medium text-white/80 hover:text-white hover:scale-105 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    key={link.name}
                                    className="text-4xl font-display font-medium text-white/80 hover:text-white hover:scale-105 transition-all"
                                    onClick={() => handleNavClick(link.href)}
                                >
                                    {link.name}
                                </motion.button>
                            )
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
