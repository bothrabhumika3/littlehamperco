import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, MessageCircle, Sparkles, Package, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../../types/product';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';
import { useWishlistStore } from '../../store/useWishlistStore';
import { StarRating } from './StarRating';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const customizeWhatsAppMsg = `Hi Little Hamper Co., I'm interested in the ${product.name}. I'd like to customize it. Please help me with the available options and pricing.`;
  const customizeUrl = getWhatsAppLink(customizeWhatsAppMsg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-600 hover:text-charcoal-900 shadow-sm border border-cream-200 hover:bg-cream-50 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Image */}
        <div className="w-full md:w-1/2 bg-cream-100/70 p-6 flex items-center justify-center relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-h-72 md:max-h-full object-cover rounded-2xl shadow-subtle aspect-[4/5]"
          />
        </div>

        {/* Details & Customization Action */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                {product.category.replace('-', ' ')}
              </span>
              <StarRating rating={product.rating} reviews={product.reviewCount} />
            </div>

            <h2 className="font-serif text-2xl font-bold text-charcoal-950 mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Custom Quote Message */}
            <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200/80 mb-4 text-xs text-stone-600 space-y-1">
              <p className="font-bold text-charcoal-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Personalized Curation</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Every hamper is customized to your preferences and budget. Contact us for a personalized quote.
              </p>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              {product.shortDescription}
            </p>

            {/* What's inside snippet */}
            <div className="bg-cream-50 p-3.5 rounded-2xl border border-cream-200/80 mb-4 text-xs">
              <p className="font-bold text-charcoal-900 mb-1.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-brand-500" />
                <span>Featured Elements:</span>
              </p>
              <ul className="space-y-1 text-stone-600 pl-4 list-disc">
                {product.whatsInside.slice(0, 3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
                {product.whatsInside.length > 3 && (
                  <li className="text-stone-400 font-medium">
                    + {product.whatsInside.length - 3} more items tailored to your choice
                  </li>
                )}
              </ul>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-sage-600" />
                <span>Pan-India Safe Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                <span>Hand-Packed With Love</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-cream-200 space-y-3">
            <div className="flex items-center gap-2">
              {/* Customize on WhatsApp button */}
              <a
                href={customizeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-gold-200" />
                <span>Customize This Hamper</span>
              </a>

              {/* Enquire on WhatsApp */}
              <a
                href={getWhatsAppLink(`Hi Little Hamper Co., I have an inquiry about ${product.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                title="Enquire on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-cream-300 bg-cream-50 text-stone-600 hover:text-rose-600'
                }`}
                aria-label="Save for inspiration"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              View Full Design Inspiration &amp; Food Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
