import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';
import { StarRating } from '../components/common/StarRating';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Package,
  Clock,
  Sparkles,
  AlertTriangle,
  Info,
  Check,
  Calendar,
  MessageSquare,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = productService.getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [giftNote, setGiftNote] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Hamper Not Found
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          The hamper you're looking for may have been updated or moved.
        </p>
        <Link
          to="/shop"
          className="inline-block py-2.5 px-6 bg-brand-500 text-white rounded-xl text-xs font-semibold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const isFreshFood = product.category === 'fresh-food' || product.tags.includes('Fresh Fruits');
  const relatedProducts = productService
    .getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      product,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      giftMessage: giftNote || undefined,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      product,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      giftMessage: giftNote || undefined,
    });
    navigate('/checkout');
  };

  return (
    <div className="bg-cream-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-600">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-brand-600 capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Section: Gallery + Product Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Gallery (Left) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] sm:aspect-square bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-subtle relative">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.bestseller && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200">
                    Bestseller
                  </span>
                )}
                {isFreshFood && (
                  <span className="bg-sage-100 text-sage-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sage-300">
                    Fresh Food
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-brand-500 shadow-sm'
                        : 'border-cream-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchasing Info (Right) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200/90 shadow-subtle space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {product.category.replace('-', ' ')}
                </span>
                <StarRating rating={product.rating} reviews={product.reviewCount} />
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-950 leading-tight">
                {product.name}
              </h1>

              {/* Personalized Pricing & Customization Notice */}
              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200/90 space-y-2 mt-4">
                <div className="flex items-center gap-2 text-brand-700 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>Customized Curation &amp; Personalized Pricing</span>
                </div>
                <p className="text-xs text-charcoal-900 font-serif italic text-base leading-snug">
                  “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
                </p>
                <div className="pt-2 grid grid-cols-2 gap-1.5 text-[11px] text-stone-600 border-t border-cream-200/60">
                  <span>&bull; Tailored to your budget</span>
                  <span>&bull; Handpicked items &amp; treats</span>
                  <span>&bull; Custom event theme &amp; ribbon</span>
                  <span>&bull; Rigid boxes, baskets or trunks</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Packaging Style Highlight */}
            <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 flex items-center gap-3">
              <Package className="w-5 h-5 text-brand-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Packaging Style
                </span>
                <span className="text-xs font-bold text-charcoal-900">{product.packaging}</span>
              </div>
            </div>

            {/* Optional Gift Note on PDP */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-charcoal-900 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-brand-500" />
                <span>Complimentary Handwritten Card Note (Optional)</span>
              </label>
              <textarea
                rows={2}
                maxLength={200}
                placeholder="Write your personal wishes here. We will inscribe them in elegant calligraphy..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 leading-relaxed"
              />
            </div>

            {/* Delivery & Cutoff Information */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-cream-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-500" />
                <span>
                  <strong>Safe Pan-India Dispatch:</strong> Express delivery from our Bangalore studio
                </span>
              </div>
              {product.sameDayDelivery && (
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>
                    Same-Day Delivery available for orders placed before{' '}
                    <strong>{siteConfig.sameDayDeliveryCutoff}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* WhatsApp Enquiry & Customization CTAs */}
            <div className="pt-4 border-t border-cream-200 space-y-3">
              {/* Primary WhatsApp Customization */}
              <a
                href={getWhatsAppLink(
                  `Hi Little Hamper Co., I'm interested in the ${product.name}. I'd like to customize it. Please help me with the available options and pricing.${giftNote ? `\nPersonal Note: "${giftNote}"` : ''}`
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-gold-200" />
                <span>Customize This Hamper on WhatsApp</span>
              </a>

              <div className="flex gap-2.5">
                {/* Secondary: Custom Hamper Builder */}
                <Link
                  to="/custom-hamper"
                  className="flex-1 py-3 px-4 bg-cream-100 hover:bg-cream-200 text-charcoal-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-cream-300"
                >
                  <span>Build From Scratch</span>
                </Link>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-cream-300 bg-cream-50 text-stone-600 hover:text-rose-600'
                  }`}
                  aria-label="Save for Inspiration"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: What's inside & Food Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* What's Inside */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-500" />
              <span>What's Inside This Hamper</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {product.whatsInside.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Food Transparency Specifications (Important requirement 9 & 20) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle">
            <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-sage-600" />
              <span>Food Specifications &amp; Quality</span>
            </h3>

            {product.foodDetails ? (
              <div className="space-y-3.5 text-xs text-stone-700">
                {product.foodDetails.weight && (
                  <div className="flex justify-between py-1.5 border-b border-cream-100">
                    <span className="font-semibold text-stone-500">Net Weight / Quantity:</span>
                    <span className="font-bold text-charcoal-900">{product.foodDetails.weight}</span>
                  </div>
                )}

                {product.foodDetails.shelfLife && (
                  <div className="flex justify-between py-1.5 border-b border-cream-100">
                    <span className="font-semibold text-stone-500">Shelf Life:</span>
                    <span className="font-medium text-charcoal-900">{product.foodDetails.shelfLife}</span>
                  </div>
                )}

                {product.foodDetails.storageInstructions && (
                  <div className="flex justify-between py-1.5 border-b border-cream-100">
                    <span className="font-semibold text-stone-500">Storage Advice:</span>
                    <span className="font-medium text-charcoal-900 text-right max-w-xs">
                      {product.foodDetails.storageInstructions}
                    </span>
                  </div>
                )}

                {product.foodDetails.ingredients && product.foodDetails.ingredients.length > 0 && (
                  <div className="py-1.5 border-b border-cream-100">
                    <span className="font-semibold text-stone-500 block mb-1">Key Ingredients:</span>
                    <p className="text-stone-700 leading-relaxed">
                      {product.foodDetails.ingredients.join(', ')}
                    </p>
                  </div>
                )}

                {product.foodDetails.allergens && product.foodDetails.allergens.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">Allergen Information:</strong>
                      <span>{product.foodDetails.allergens.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-stone-500 space-y-2">
                <p>This hamper comprises non-perishable lifestyle and keepsake items.</p>
                <p>Carefully hand-checked before dispatch for pristine condition.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Hampers */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-cream-200">
            <h3 className="font-serif text-2xl font-bold text-charcoal-950 mb-6">
              You May Also Love
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
