import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Baby, Heart } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types/product';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';

export const BabyShowerPage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const babyProducts = productService.getProductsByCategory('baby-shower');

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            <Baby className="w-3.5 h-3.5" />
            <span>Gentle Care &amp; Newborn Milestones</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-950 tracking-tight">
            Baby Shower &amp; Newborn Hampers
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Welcome the newest blessings with gentle, all-natural care. Every hamper is customized to your preferences and budget. Contact us for a personalized quote.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/custom-hamper"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Customize Baby Hamper</span>
            </Link>
            <a
              href={getWhatsAppLink('Hi Little Hamper Co.! I would like help curating a baby shower / newborn gift.')}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 rounded-xl text-xs font-semibold"
            >
              WhatsApp Assistant ({siteConfig.phone})
            </a>
          </div>
        </div>

        {/* Baby Collection Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {babyProducts.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
