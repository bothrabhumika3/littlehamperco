import React from 'react';

interface BadgeProps {
  variant?: 'bestseller' | 'fresh' | 'sameDay' | 'featured' | 'tag';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'tag', children, className = '' }) => {
  const styles = {
    bestseller: 'bg-amber-100 text-amber-900 border-amber-200/80',
    fresh: 'bg-sage-100 text-sage-800 border-sage-300',
    sameDay: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    featured: 'bg-brand-100 text-brand-900 border-brand-200',
    tag: 'bg-cream-100 text-charcoal-800 border-cream-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wide uppercase ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
