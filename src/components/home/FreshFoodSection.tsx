import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, ThermometerSnowflake, PackageCheck } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types/product';

interface FreshFoodSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const FreshFoodSection: React.FC<FreshFoodSectionProps> = ({ products, onQuickView }) => {
  // Filter products relevant to fresh food, fruits, bakes, or dry fruits
  const freshFoodProducts = products
    .filter(
      (p) =>
        p.category === 'fresh-food' ||
        p.category === 'dry-fruits' ||
        p.category === 'chocolates' ||
        p.tags.includes('Fresh Fruits')
    )
    .slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest text-sage-600 mb-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Culinary Excellence &amp; Farm-Fresh Produce</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight">
              Freshly Curated. Beautifully Packed.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Wholesome orchard fruits, hand-rolled chocolates, premium dry fruits, and gourmet spreads. Every hamper is customized to your preferences and budget. Contact us for a personalized quote.
            </p>
          </div>

          <Link
            to="/shop/fresh-food"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 mt-4 md:mt-0 self-start md:self-auto"
          >
            <span>View All Fresh Food Hampers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Transparency Highlights Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 bg-cream-50 p-4 sm:p-5 rounded-2xl border border-cream-200/80 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">A-Grade Orchard Picks</p>
              <p className="text-[10px] text-stone-500">Hand-selected seasonal fruits</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">100% Label Clarity</p>
              <p className="text-[10px] text-stone-500">Clear allergens, weight &amp; shelf life</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">Climate-Safe Packing</p>
              <p className="text-[10px] text-stone-500">Insulated cushioning prevents damage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">Hygienically Sealed</p>
              <p className="text-[10px] text-stone-500">Airtight food-grade packaging</p>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshFoodProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
};
