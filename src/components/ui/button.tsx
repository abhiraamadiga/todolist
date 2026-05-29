import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white border border-primary hover:bg-[#920c14] hover:border-[#920c14] shadow-sm",
    secondary: "bg-transparent text-secondary border border-secondary/40 hover:bg-secondary/5 hover:border-secondary",
    ghost: "bg-transparent text-secondary hover:bg-secondary/5 border border-transparent",
    danger: "bg-error text-white border border-error hover:bg-[#a11616] hover:border-[#a11616]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs tracking-wider uppercase",
    md: "px-4 py-2 text-sm tracking-wide",
    lg: "px-6 py-3 text-base tracking-wide",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
