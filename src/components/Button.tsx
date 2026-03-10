import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
    const baseStyle = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 transform hover:-translate-y-0.5",
        secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/5",
        outline: "border border-white/20 hover:bg-white/10 text-white",
        ghost: "hover:bg-white/10 text-white",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}
