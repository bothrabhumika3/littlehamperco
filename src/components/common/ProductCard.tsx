import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Sparkles, Eye, Clock } from 'lucide-react';
import { Product } from '../../types/product';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';
import { useWishlistStore } from '../../store/useWishlistStore';
import { StarRating } from './StarRating';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const customizeWhatsAppMsg = `Hi Little Hamper Co., I'm interested in the ${product.name}. I'd like to customize it. Please help me with the available options and pricing.`;
  const customizeUrl = getWhatsAppLink(customizeWhatsAppMsg);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const isFreshFood = product.category === 'fresh-food' || product.tags.includes('Fresh Fruits');

  return (
    <div className="group relative bg-white rounded-3xl border border-cream-200/90 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      {/* High-Impact Photo Showcase (Portrait 4:5 Gallery Ratio) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100/70">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges Stack (Top-Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.bestseller && <Badge variant="bestseller">Signature Design</Badge>}
          {isFreshFood && <Badge variant="fresh">Fresh Produce</Badge>}
          {product.sameDayDelivery && (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-charcoal-800 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-cream-200 shadow-xs">
              <Clock className="w-2.5 h-2.5 text-brand-500" />
              <span>Same-Day Available</span>
            </span>
          )}
        </div>

        {/* Wishlist Button (Top-Right) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/90 backdrop-blur-xs text-stone-600 hover:text-rose-600 hover:bg-white shadow-subtle'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save for inspiration'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-xs text-charcoal-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-card border border-cream-200 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-cream-50"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>View Inspiration</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Category & Veg indicator */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600 bg-brand-50/70 px-2 py-0.5 rounded-md">
              {product.category.replace('-', ' ')}
            </span>
            {product.foodDetails?.isVegetarian && (
              <span
                className="w-3.5 h-3.5 border border-emerald-600 p-[1.5px] rounded-xs flex items-center justify-center"
                title="100% Pure Vegetarian"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </span>
            )}
          </div>

          {/* Hamper Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-950 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="mt-2">
            <StarRating rating={product.rating} reviews={product.reviewCount} />
          </div>
        </div>

        {/* Value Messaging (No Price Shown) */}
        <div className="pt-2 border-t border-cream-100/80 space-y-3">
          <p className="text-[11px] text-stone-500 italic bg-cream-50/70 p-2 rounded-xl border border-cream-200/60 leading-tight">
            ✨ <strong className="text-charcoal-800 not-italic font-semibold">Customized to your budget &amp; style:</strong> Final pricing depends on products, packaging, and quantity.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Primary Action: Customize This Hamper (Opens WhatsApp) */}
            <a
              href={customizeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-200" />
              <span>Customize This</span>
            </a>

            {/* Secondary Action: Enquire on WhatsApp */}
            <a
              href={getWhatsAppLink(`Hi Little Hamper Co., I would like to enquire about ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
