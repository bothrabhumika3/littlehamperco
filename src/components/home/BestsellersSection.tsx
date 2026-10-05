import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types/product';

interface BestsellersSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({ products, onQuickView }) => {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);

  return (
    <section className="py-16 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest text-brand-600 mb-1.5">
              <Flame className="w-3.5 h-3.5 text-brand-500" />
              <span>Customer Favorites &amp; Top Rated</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight">
              Our Most Loved Hampers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
              Explore our most requested hamper designs for inspiration. Every hamper is customized to your preferences and budget. Contact us for a personalized quote.
            </p>
          </div>

          <Link
            to="/shop?filter=bestsellers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 mt-4 md:mt-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Bestsellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
};
