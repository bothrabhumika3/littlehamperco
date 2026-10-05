import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { orderService } from '../services/orderService';
import { formatCurrency, siteConfig } from '../config/siteConfig';
import { PaymentMethod, ShippingAddress } from '../types/order';
import {
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Lock,
  Truck,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, appliedCoupon, getTotals, clearCart } = useCartStore();

  const totals = getTotals();

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    pincode: '',
    city: '',
    state: 'Madhya Pradesh',
    landmark: '',
    deliveryDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // 2 days in advance default
    deliverySlot: 'Morning (9:00 AM – 1:00 PM)',
    giftMessage: '',
    deliveryInstructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  if (items.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
          Your Basket is Empty
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-semibold"
        >
          Browse Hampers
        </Link>
      </div>
    );
  }

  const deliverySlots = [
    'Morning (9:00 AM – 1:00 PM)',
    'Afternoon (1:00 PM – 5:00 PM)',
    'Evening (5:00 PM – 9:00 PM)',
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName.trim() || !address.phone.trim() || !address.addressLine.trim() || !address.pincode.trim() || !address.city.trim()) {
      setFormError('Please fill in all required shipping address fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormError('');
    setIsProcessing(true);

    // Simulate payment gateway processing
    setTimeout(() => {
      const order = orderService.createOrder({
        items,
        shippingAddress: address,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Cash On Delivery' : 'Paid',
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        deliveryFee: totals.deliveryFee,
        packagingFee: totals.packagingFee,
        totalAmount: totals.totalAmount,
        couponCode: appliedCoupon?.code,
        status: 'Confirmed',
        trackingNumber: `LHC-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: `${address.deliveryDate} (${address.deliverySlot.split(' ')[0]})`,
      });

      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 1800);
  };

  return (
    <div className="bg-cream-50/70 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 mb-8">
          Secure Checkout
        </h1>

        {formError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping & Payment Fields (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Customer & Delivery Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-500" />
                <span>1. Shipping &amp; Recipient Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient's Name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Email for Updates &amp; Tracking *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Delivery Address (House/Flat No, Building, Street) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Flat 302, Palm Grove Apartments, 14th Main"
                    value={address.addressLine}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                    className="w-full p-3 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN code"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhopal, Mumbai, Delhi"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near City Park"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Preferred Delivery Date & Slot */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-cream-200 pb-3 gap-2">
                <h2 className="font-serif text-xl font-bold text-charcoal-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-500" />
                  <span>2. Schedule Delivery</span>
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Delivery time slot: Available
                  </span>
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                    Delivery time: 2–3 days
                  </span>
                </div>
              </div>

              {/* Order Processing Hours Banner */}
              <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200/80 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>
                    <strong>Order time:</strong> 10 AM – 9 PM &bull; <strong>Sunday:</strong> 10 AM – 6 PM
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-medium">Helpline: {siteConfig.phone}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Target Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={address.deliveryDate}
                    onChange={(e) => setAddress({ ...address, deliveryDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={address.deliverySlot}
                    onChange={(e) => setAddress({ ...address, deliverySlot: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 font-medium"
                  >
                    {deliverySlots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Special Delivery Instructions (e.g. Leave with security / Ring bell)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Surprise delivery, please do not reveal sender until opened"
                    value={address.deliveryInstructions}
                    onChange={(e) =>
                      setAddress({ ...address, deliveryInstructions: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Mock Payment Flow */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <span>3. Payment Method</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  Razorpay Architecture Ready
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'border-brand-500 bg-brand-50/40 text-brand-800 font-bold'
                      : 'border-cream-200 bg-cream-50/60 text-stone-600'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-brand-500 bg-brand-50/40 text-brand-800 font-bold'
                      : 'border-cream-200 bg-cream-50/60 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-500 bg-brand-50/40 text-brand-800 font-bold'
                      : 'border-cream-200 bg-cream-50/60 text-stone-600'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs">NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'border-brand-500 bg-brand-50/40 text-brand-800 font-bold'
                      : 'border-cream-200 bg-cream-50/60 text-stone-600'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs">Pay on Delivery</span>
                </button>
              </div>

              {/* Payment Detail Simulator */}
              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200">
                {paymentMethod === 'upi' && (
                  <div className="space-y-2 text-xs">
                    <label className="block font-bold text-charcoal-900">
                      Enter UPI ID / VPA:
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl bg-white"
                    />
                    <p className="text-[10px] text-stone-400">
                      Supports Google Pay, PhonePe, Paytm, BHIM and all banking apps.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block font-bold text-charcoal-900 mb-1">
                        Card Number:
                      </label>
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        defaultValue="12/28"
                        placeholder="MM/YY"
                        className="px-3.5 py-2 text-xs border border-cream-300 rounded-xl bg-white font-mono"
                      />
                      <input
                        type="password"
                        defaultValue="•••"
                        placeholder="CVV"
                        className="px-3.5 py-2 text-xs border border-cream-300 rounded-xl bg-white font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2 text-xs">
                    <label className="block font-bold text-charcoal-900">Select Bank:</label>
                    <select className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl bg-white font-medium">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="text-xs text-stone-600">
                    <p className="font-semibold text-charcoal-900">
                      Cash / UPI on Delivery
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Pay safely via Cash or scan the delivery agent's UPI QR code when the hamper arrives at your doorstep.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Order Summary (Right) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-charcoal-950 pb-3 border-b border-cream-200">
              Basket Summary ({items.length} items)
            </h3>

            {/* Item Mini List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-cream-100 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-charcoal-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-charcoal-900 shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-cream-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.packagingFee > 0 && (
                <div className="flex justify-between">
                  <span>Special Packaging</span>
                  <span>{formatCurrency(totals.packagingFee)}</span>
                </div>
              )}
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(totals.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {totals.deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase">FREE</span>
                  ) : (
                    formatCurrency(totals.deliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-charcoal-950 pt-3 border-t border-cream-200">
                <span>Total Due</span>
                <span className="text-xl text-brand-600 font-bold">
                  {formatCurrency(totals.totalAmount)}
                </span>
              </div>
            </div>

            {/* Customer Policies & Ordering Terms */}
            <div className="p-3.5 bg-cream-50/90 rounded-2xl border border-cream-200 space-y-2 text-[11px] text-stone-600">
              <p className="flex items-center gap-1.5 font-bold text-charcoal-900">
                <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Customer Policies &amp; Ordering Terms</span>
              </p>
              <div className="space-y-1 text-stone-600 pl-5">
                <p>&bull; <strong>No returns; replacement only</strong></p>
                <p>&bull; <strong>Pre-order cancellation:</strong> Full refund if cancelled within 24 hours</p>
                <p>&bull; <strong>Delivery time:</strong> 2–3 days &bull; Time slots available</p>
                <p>&bull; <strong>Contact / Helpline:</strong> {siteConfig.phone}</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all active:scale-[0.99] disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Secure Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order &bull; {formatCurrency(totals.totalAmount)}</span>
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                <span>SSL Encrypted &bull; 100% Guaranteed Handcrafted Quality</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
