import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';

const SLIDE_DURATION = 6000;

// Only include projects that have a vimeoId for video playback
const videoProjects = projects.filter(p => p.vimeoId);

interface ShowreelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Showreel({ isOpen, onClose }: ShowreelProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const project = videoProjects[currentIndex];
    const progress = ((currentIndex + 1) / videoProjects.length) * 100;

    const goNext = useCallback(() => {
        setVideoLoaded(false);
        setCurrentIndex((prev) => (prev + 1) % videoProjects.length);
    }, []);

    const goPrev = useCallback(() => {
        setVideoLoaded(false);
        setCurrentIndex((prev) => (prev - 1 + videoProjects.length) % videoProjects.length);
    }, []);

    // Auto-advance timer
    useEffect(() => {
        if (!isOpen || isPaused) return;
        timerRef.current = setInterval(goNext, SLIDE_DURATION);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isOpen, isPaused, goNext, currentIndex]);

    // Reset on open/close
    useEffect(() => {
        if (!isOpen) {
            setCurrentIndex(0);
            setVideoLoaded(false);
        }
    }, [isOpen]);

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === ' ') { e.preventDefault(); setIsPaused(p => !p); }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose, goNext, goPrev]);

    if (!isOpen) return null;

    const vimeoSrc = project.vimeoId
        ? `https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&controls=0&dnt=1&quality=720p`
        : null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black"
                onClick={() => setIsPaused(p => !p)}
            >
                {/* Video Background */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        {/* Fallback image while video loads */}
                        <img
                            src={project.img}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                        />

                        {/* Vimeo video embed */}
                        {vimeoSrc && (
                            <div className="absolute inset-0 overflow-hidden">
                                <iframe
                                    src={vimeoSrc}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full border-0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    onLoad={() => {
                                        // Give the video a moment to start playing before revealing
                                        setTimeout(() => setVideoLoaded(true), 800);
                                    }}
                                />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Close button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Nav arrows */}
                <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 lg:px-24 pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl"
                        >
                            {/* Brand */}
                            <p className="text-accent font-medium text-lg mb-2 tracking-wide">{project.brand}</p>

                            {/* Title */}
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 leading-[0.95]">
                                {project.title}
                            </h2>

                            {/* Services */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.services.map((s) => (
                                    <span key={s} className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white/80 border border-white/20">
                                        {s}
                                    </span>
                                ))}
                                <span className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white/80 border border-white/20">
                                    {project.year}
                                </span>
                            </div>

                            {/* Awards */}
                            {project.awards && project.awards.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {project.awards.map((award) => (
                                        <span key={award} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                            <Award className="w-3 h-3" />
                                            {award}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex-grow h-px bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white/60"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-xs text-white/50 font-mono tabular-nums shrink-0">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(videoProjects.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Slide indicators */}
                    <div className="flex gap-1 mt-3">
                        {videoProjects.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setVideoLoaded(false); setCurrentIndex(i); }}
                                className="relative h-1 flex-grow rounded-full overflow-hidden bg-white/10"
                            >
                                {i === currentIndex && !isPaused && (
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-white/60 rounded-full"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                                        key={`progress-${currentIndex}-${Date.now()}`}
                                    />
                                )}
                                {i < currentIndex && (
                                    <div className="absolute inset-0 bg-white/40 rounded-full" />
                                )}
                                {i === currentIndex && isPaused && (
                                    <div className="absolute inset-y-0 left-0 bg-white/60 rounded-full" style={{ width: '50%' }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pause indicator */}
                {isPaused && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/60 text-xs">
                        Paused — click or press space to resume
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
