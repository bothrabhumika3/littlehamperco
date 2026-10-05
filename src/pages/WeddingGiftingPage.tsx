import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types/product';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

export const WeddingGiftingPage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const weddingProducts = productService.getProductsByOccasion('wedding');

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Royal Hospitality &amp; Memorable Celebrations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-950 tracking-tight">
            Curated Wedding Hampers &amp; Favors
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Welcome your guests with the royal hospitality they deserve. We curate destination wedding room hampers, bridesmaid proposal trunks, and elegant return favors personalized with your wedding monogram.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/custom-hamper"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Custom Wedding Hampers</span>
            </Link>
            <a
              href={getWhatsAppLink('Hi Little Hamper Co.! I would like to consult about our upcoming wedding hampers.')}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 rounded-xl text-xs font-semibold"
            >
              Speak with Wedding Stylist ({siteConfig.phone})
            </a>
          </div>
        </div>

        {/* Wedding Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">Room Welcome Hampers</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Delight your guests upon checking into their hotel suites with royal snacks, kahwa tea, and welcome itineraries.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">Bridesmaid Proposal Trunks</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Silky robes, scented candles, hairpins, and celebratory sweets to ask your closest friends to stand with you.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">Groomsmen Dapper Sets</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Cufflinks, pocket squares, single-malt infused truffles, and grooming essentials for the groom’s crew.
            </p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">Wedding Return Favors</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Brass diyas, silver vark sweets, and artisanal nuts packaged in bespoke brocade or velvet sliding boxes.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="border-t border-cream-200 pt-12">
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
              Featured Wedding Hampers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 italic">
              “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
