import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { seedCategories } from '../../data/seedCategories';

export const QuickCategories: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-600">
              Browse Our Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mt-1">
              Find the Perfect Little Hamper
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 mt-2 md:mt-0"
          >
            <span>Explore all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 12 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {seedCategories.map((cat) => (
            <Link
              key={cat.id}
              to={
                cat.id === 'fresh-food'
                  ? '/shop/fresh-food'
                  : cat.id === 'wedding'
                  ? '/weddings'
                  : cat.id === 'baby-shower'
                  ? '/baby-shower'
                  : cat.id === 'corporate'
                  ? '/corporate'
                  : `/shop/${cat.slug}`
              }
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-cream-100 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-end p-3 border border-cream-200/60"
            >
              {/* Background Image with subtle zoom */}
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient Overlay for high text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                {cat.isFreshFood && (
                  <span className="inline-block text-[9px] font-bold bg-sage-500 text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider mb-1">
                    Fresh Food
                  </span>
                )}
                <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-snug group-hover:text-gold-300 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
