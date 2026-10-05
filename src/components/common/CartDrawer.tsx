import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency, siteConfig } from '../../config/siteConfig';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponAppliedMessage, setCouponAppliedMessage] = useState(false);

  const {
    items,
    isCartOpen,
    appliedCoupon,
    couponError,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getTotals,
  } = useCartStore();

  if (!isCartOpen) return null;

  const totals = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponAppliedMessage(true);
      setTimeout(() => setCouponAppliedMessage(false), 2000);
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <h2 className="font-serif text-lg font-bold text-charcoal-900">
              Your Gift Basket ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full text-stone-500 hover:text-charcoal-900 hover:bg-cream-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Curation Assurance Banner */}
        <div className="bg-cream-100/60 p-3.5 border-b border-cream-200 text-xs flex items-center gap-2 text-stone-700">
          <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
          <span>Each hamper is hand-styled with custom ribbons & personal note.</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-3xl">
                🧺
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-1">
                Your basket is empty
              </h3>
              <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                Explore our curated hampers or design a personalized one tailored to your loved one.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block py-2.5 px-5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  Shop Ready Hampers
                </Link>
                <Link
                  to="/custom-hamper"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block py-2.5 px-5 bg-cream-100 hover:bg-cream-200 text-brand-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Build Custom Hamper
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-2xl bg-cream-50/60 border border-cream-200/80 transition-all hover:bg-cream-50"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-cream-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-charcoal-900 leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1 -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Custom Hamper Breakdown */}
                    {item.customConfig ? (
                      <div className="text-[10px] text-stone-500 mt-1 space-y-0.5">
                        <p>
                          <span className="font-semibold text-stone-700">Occasion:</span>{' '}
                          {item.customConfig.occasion} &bull; {item.customConfig.theme}
                        </p>
                        <p>
                          <span className="font-semibold text-stone-700">Box:</span>{' '}
                          {item.customConfig.packaging.name}
                        </p>
                        {item.customConfig.hasHandwrittenNote && (
                          <span className="inline-block text-[9px] bg-gold-100 text-gold-800 px-1.5 py-0.2 rounded font-medium">
                            Handwritten Note Included
                          </span>
                        )}
                      </div>
                    ) : (
                      item.giftMessage && (
                        <p className="text-[10px] text-brand-600 mt-0.5 truncate">
                          Gift Msg: "{item.giftMessage}"
                        </p>
                      )
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-cream-100">
                    <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-cream-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-charcoal-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-cream-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      Custom Quote
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-cream-200 bg-white space-y-3.5">
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon (e.g. WELCOME10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:border-brand-500 uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-charcoal-800 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            {couponError && (
              <p className="text-[11px] text-rose-600 font-medium -mt-1.5">{couponError}</p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200">
                <span className="flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Coupon {appliedCoupon.code} Applied!</span>
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-stone-500 hover:text-rose-600 underline text-[10px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Hamper Summary */}
            <div className="space-y-2 text-xs text-stone-600 pt-1 border-t border-cream-100">
              <div className="flex justify-between font-semibold text-charcoal-900">
                <span>Selected Hampers</span>
                <span>{items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'item' : 'items'}</span>
              </div>
              <p className="text-[11px] text-stone-500 italic bg-cream-50 p-2.5 rounded-xl border border-cream-200/60 leading-tight">
                ✨ Every hamper is customized to your preferences and style. Final quote and mockups are shared upon review.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <a
                href={siteConfig.whatsapp ? `https://wa.me/91${siteConfig.whatsapp}?text=${encodeURIComponent('Hi Little Hamper Co.! I would like to consult about the custom hampers in my basket.')}` : '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all active:scale-[0.99]"
              >
                <span>Consult on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between text-xs px-1">
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-500 hover:text-brand-600 underline text-[11px]"
                >
                  View Full Cart Details
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-500 hover:text-charcoal-900 text-[11px]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
