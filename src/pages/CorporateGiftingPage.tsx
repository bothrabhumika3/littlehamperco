import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types/product';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

export const CorporateGiftingPage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const corporateProducts = productService.getProductsByCategory('corporate');

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Executive Hampers &amp; Team Milestone Gifting</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-950 tracking-tight">
            Make Business Gifting Personal
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Move away from boring generic corporate pens. Our executive boxes pair single-estate coffees, roasted royal nuts, artisan chocolates, and refined leather stationery that leave a lasting mark.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/bulk-gifting"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <span>Request Corporate Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppLink('Hi Little Hamper Co.! I would like to enquire about corporate gifting.')}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 rounded-xl text-xs font-semibold"
            >
              WhatsApp Corporate Desk ({siteConfig.phone})
            </a>
          </div>
        </div>

        {/* Corporate Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
              Employee Welcome &amp; Onboarding
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Create an unforgettable first day for new hires with customized notebooks, tumblers, and gourmet desk fuel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
              Festive &amp; Diwali Hampers
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Celebrate festive seasons with traditional brass keepsakes, dry fruits in luxury jars, and authentic sweets.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
              VIP Client Appreciation
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Show gratitude to key accounts with handcrafted wooden chests, rare Darjeeling teas, and Belgian truffles.
            </p>
          </div>
        </div>

        {/* Catalog */}
        <div className="border-t border-cream-200 pt-12">
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
              Executive &amp; Corporate Hampers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 italic">
              “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
