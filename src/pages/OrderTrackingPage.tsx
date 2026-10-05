import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { formatCurrency, siteConfig } from '../config/siteConfig';
import { Order, OrderStatus } from '../types/order';
import {
  Search,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'LHC-8921'; // demo order fallback
  const [searchId, setSearchId] = useState(initialId);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialId) {
      const found = orderService.getOrderById(initialId);
      if (found) {
        setOrder(found);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orderService.getOrderById(searchId);
    if (found) {
      setOrder(found);
      setError(false);
      setSearchParams({ id: found.id });
    } else {
      setOrder(null);
      setError(true);
    }
  };

  const trackingSteps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Pending', label: 'Order Placed', desc: 'Received & awaiting verification' },
    { status: 'Confirmed', label: 'Order Confirmed', desc: 'Verified by Little Hamper Co.' },
    { status: 'Packing', label: 'Being Packed', desc: 'Curating treats, ribbon & calligraphy' },
    { status: 'Ready', label: 'Ready for Dispatch', desc: 'Sealed in protective transit crate' },
    { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'On its way with delivery agent' },
    { status: 'Delivered', label: 'Delivered', desc: 'Delivered to recipient with love' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Packing':
        return 2;
      case 'Ready':
        return 3;
      case 'Out for Delivery':
        return 4;
      case 'Delivered':
        return 5;
      default:
        return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search Bar */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-600">
            Real-Time Updates
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
            Track Your Hamper
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Enter your Order ID (e.g. LHC-8921 or your confirmation ID) to check live status.
          </p>

          <form onSubmit={handleSearch} className="pt-2 flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g. LHC-8921"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs uppercase font-bold tracking-wider border border-cream-300 rounded-xl bg-white focus:outline-none focus:border-brand-500 shadow-subtle"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              Track
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-600 font-medium">
              Could not find order "{searchId}". Try sample ID <strong>LHC-8921</strong>.
            </p>
          )}
        </div>

        {/* Tracking Details & Timeline */}
        {order && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Order Overview Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-950">
                    Order #{order.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full border border-brand-200">
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; Recipient: <strong>{order.shippingAddress.fullName}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Estimated Arrival
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {order.estimatedDelivery || order.shippingAddress.deliveryDate}
                </span>
              </div>
            </div>

            {/* Step-by-Step Visual Tracker Timeline */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-subtle space-y-8">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3">
                Live Timeline
              </h2>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden sm:block absolute top-1/2 left-0 w-full h-1 bg-cream-200 -translate-y-1/2 -z-0" />
                <div
                  className="hidden sm:block absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 transition-all duration-500 -z-0"
                  style={{
                    width: `${(currentStepIdx / (trackingSteps.length - 1)) * 100}%`,
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 sm:gap-2">
                  {trackingSteps.map((step, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div
                        key={step.status}
                        className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 relative z-10"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2 ${
                            isDone
                              ? 'bg-brand-500 border-brand-500 text-white shadow-sm'
                              : 'bg-white border-stone-300 text-stone-400'
                          } ${isCurrent ? 'ring-4 ring-brand-100 scale-110' : ''}`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>

                        <div>
                          <p
                            className={`text-xs font-bold leading-tight ${
                              isDone ? 'text-charcoal-900' : 'text-stone-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-[10px] text-stone-500 leading-snug mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Logs */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="pt-6 border-t border-cream-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                    Recent Status Updates
                  </h3>
                  <div className="space-y-2">
                    {order.statusHistory.map((hist, i) => (
                      <div
                        key={i}
                        className="p-3 bg-cream-50/70 rounded-2xl border border-cream-100 text-xs flex items-start justify-between gap-4"
                      >
                        <div>
                          <span className="font-bold text-charcoal-900">{hist.status}</span>
                          {hist.note && <p className="text-stone-600 mt-0.5">{hist.note}</p>}
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 shrink-0">
                          {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Items & Shipping Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-3">
                <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-500" />
                  <span>Items In This Package</span>
                </h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs py-1 border-b border-cream-100">
                      <span className="font-medium text-stone-700">{item.name} &times; {item.quantity}</span>
                      <span className="font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">Packed with Care</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-bold text-charcoal-900 pt-1">
                    <span>Total Packages</span>
                    <span>{order.items.reduce((acc, i) => acc + i.quantity, 0)} {order.items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'Hamper' : 'Hampers'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-3">
                <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>Delivery Destination</span>
                </h3>
                <div className="text-xs text-stone-600 space-y-1">
                  <p className="font-bold text-charcoal-900">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</p>
                  <p className="text-stone-500">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
