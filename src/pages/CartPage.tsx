import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency, siteConfig } from '../config/siteConfig';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Check,
  Package,
  ShieldCheck,
  Truck,
  Clock,
  RotateCcw,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const {
    items,
    appliedCoupon,
    couponError,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getTotals,
  } = useCartStore();

  const totals = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponSuccess(true);
      setTimeout(() => setCouponSuccess(false), 2500);
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-4xl">
            🧺
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
            Your Gift Basket is Empty
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-8 leading-relaxed">
            Looks like you haven't selected any hampers yet. Explore our bestsellers or create a custom hamper tailored to your occasion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Shop Ready-Made Hampers
            </Link>
            <Link
              to="/custom-hamper"
              className="px-6 py-3 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Create Custom Hamper
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 mb-8">
          Shopping Basket ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Curation Assurance Banner */}
            <div className="bg-white p-4 rounded-3xl border border-cream-200 shadow-subtle flex items-center gap-2.5 text-stone-700 text-xs">
              <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
              <span>Thoughtfully packed and customized for your celebration. Final quotes and scheduling confirmed via WhatsApp.</span>
            </div>

            {/* Cart Items Cards */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-subtle divide-y divide-cream-100 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 leading-snug">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Custom Hamper Config Details */}
                    {item.customConfig ? (
                      <div className="mt-2 text-xs text-stone-600 space-y-1 bg-cream-50 p-3 rounded-xl border border-cream-100">
                        <p>
                          <strong>Occasion:</strong> {item.customConfig.occasion} &bull; <strong>Recipient:</strong> {item.customConfig.recipient}
                        </p>
                        <p>
                          <strong>Box / Basket:</strong> {item.customConfig.packaging.name} &bull; <strong>Theme:</strong> {item.customConfig.theme}
                        </p>
                        {item.customConfig.personalMessage && (
                          <p className="italic text-stone-500">
                            "{item.customConfig.personalMessage}"
                          </p>
                        )}
                        {item.customConfig.hasHandwrittenNote && (
                          <span className="inline-block text-[10px] font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                            Handwritten Calligraphy Card Included
                          </span>
                        )}
                      </div>
                    ) : (
                      item.giftMessage && (
                        <p className="mt-1 text-xs text-brand-600 italic">
                          Gift Message: "{item.giftMessage}"
                        </p>
                      )
                    )}

                    {/* Quantity and Price */}
                    <div className="pt-4 mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 text-xs text-stone-600 hover:bg-cream-200"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 text-xs text-stone-600 hover:bg-cream-200"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
                          Custom Quote
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-2 text-xs">
              <Link to="/shop" className="text-brand-600 font-semibold hover:underline">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Box (Right) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle space-y-6">
            <h2 className="font-serif text-xl font-bold text-charcoal-950 pb-3 border-b border-cream-200">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-bold text-charcoal-900">
                Promo or Discount Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 uppercase tracking-wider font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-white rounded-xl text-xs font-semibold"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs border border-emerald-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon {appliedCoupon.code} Applied</span>
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-rose-600 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Hamper Breakdown */}
            <div className="space-y-3 text-xs text-stone-600 pt-3 border-t border-cream-100">
              <div className="flex justify-between font-semibold text-charcoal-900 text-sm">
                <span>Selected Items</span>
                <span>{items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'hamper' : 'hampers'}</span>
              </div>
              <p className="text-[11px] text-stone-500 italic bg-cream-50 p-3 rounded-2xl border border-cream-200/60 leading-relaxed">
                ✨ <strong>Bespoke Curation:</strong> Every hamper is personalized to your exact preferences, budget, and event aesthetic. Connect directly with our curation desk to finalize ribbons, colors, and delivery details.
              </p>
            </div>

            {/* Consultation CTA */}
            <a
              href={siteConfig.whatsapp ? `https://wa.me/91${siteConfig.whatsapp}?text=${encodeURIComponent('Hi Little Hamper Co.! I would like to consult about the custom hampers in my basket.')}` : '#'}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all active:scale-[0.99]"
            >
              <span>Consult on WhatsApp ({siteConfig.phone})</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Trust Badges & Customer Policies */}
            <div className="space-y-2 pt-2 text-[11px] text-stone-600 border-t border-cream-100">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span><strong>Delivery time:</strong> 2–3 days (Time slots available)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span><strong>Order time:</strong> 10 AM – 9 PM | <strong>Sunday:</strong> 10 AM – 6 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                <span><strong>No returns; replacement only</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Pre-order cancellation:</strong> Full refund if cancelled within 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
