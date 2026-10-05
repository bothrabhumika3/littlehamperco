import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { orderService } from '../services/orderService';
import { formatCurrency, siteConfig } from '../config/siteConfig';
import {
  CheckCircle2,
  Package,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderService.getOrderById(orderId || '');

  useEffect(() => {
    // Launch festive confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C86D51', '#C5A880', '#566E4C', '#F4ECE0'],
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">Order Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">Could not locate order ID "{orderId}".</p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-brand-500 text-white rounded-xl text-xs font-semibold"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-card text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Order Confirmed &bull; #{order.id}
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-950 leading-tight">
            “Your hamper is on its way to becoming someone's favourite surprise. ❤️”
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Thank you for trusting Little Hamper Co. Our artisans are hand-assembling your selections and inscribing your personalized note with care.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to={`/track-order?id=${order.id}`}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Live</span>
            </Link>

            <Link
              to="/shop"
              className="px-6 py-3 bg-cream-100 hover:bg-cream-200 text-charcoal-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-cream-200"
            >
              <ShoppingBag className="w-4 h-4 text-stone-500" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Detailed Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-subtle space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3">
            Order Details
          </h2>

          {/* Items List */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Items Ordered ({order.items.length})
            </p>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-cream-50/70 border border-cream-100 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-white shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-charcoal-900">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">Qty: {item.quantity}</p>
                    {item.giftMessage && (
                      <p className="text-[10px] text-brand-600 italic">
                        Note: "{item.giftMessage}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Address & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200 text-xs">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px] block">
                Delivery Address
              </span>
              <p className="font-bold text-charcoal-900">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600 leading-relaxed">{order.shippingAddress.addressLine}</p>
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} –{' '}
                {order.shippingAddress.pincode}
              </p>
              <p className="text-stone-500">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px] block">
                Scheduled Slot &amp; Delivery
              </span>
              <p className="text-stone-700">
                <strong>Delivery Date:</strong> {order.shippingAddress.deliveryDate}
              </p>
              <p className="text-stone-700">
                <strong>Slot:</strong> {order.shippingAddress.deliverySlot}
              </p>
              <p className="text-stone-700">
                <strong>Total Packages:</strong>{' '}
                <span className="text-brand-600 font-bold">
                  {order.items.reduce((acc, i) => acc + i.quantity, 0)} {order.items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'Hamper' : 'Hampers'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
