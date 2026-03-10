import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
    return (
        <section id={id} className={`py-24 md:py-32 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl w-full ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex justify-center flex-col items-center"
            >
                <div className="w-full max-w-6xl">
                    {children}
                </div>
            </motion.div>
        </section>
    );
}
