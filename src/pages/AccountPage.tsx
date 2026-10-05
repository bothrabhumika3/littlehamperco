import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { customHamperService } from '../services/customHamperService';
import { useWishlistStore } from '../store/useWishlistStore';
import { formatCurrency, siteConfig } from '../config/siteConfig';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Sparkles,
  LogOut,
  ExternalLink,
  Clock,
  Package,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'orders' | 'custom' | 'addresses'
  >('orders');

  const orders = orderService.getAllOrders();
  const customRequests = customHamperService.getAllRequests();
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Account Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-6">
            {/* User Profile Glance */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-cream-200">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">
                P
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">Pooja Sharma</h3>
                <p className="text-xs text-stone-500">pooja.sharma@example.com</p>
                <span className="inline-block mt-0.5 text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.2 rounded-full">
                  Little Hamper Co. Member
                </span>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  activeTab === 'orders'
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-stone-600 hover:bg-cream-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  activeTab === 'custom'
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-stone-600 hover:bg-cream-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>Custom Hamper Requests ({customRequests.length})</span>
                </span>
              </button>

              <Link
                to="/wishlist"
                className="w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between text-stone-600 hover:bg-cream-50"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist ({wishlistCount})</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </Link>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  activeTab === 'addresses'
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-stone-600 hover:bg-cream-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  activeTab === 'profile'
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-stone-600 hover:bg-cream-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </span>
              </button>
            </nav>

            <div className="pt-4 border-t border-cream-200">
              <button
                onClick={() => alert('Demo logout successful.')}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tab Content Canvas (Right) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-subtle min-h-[400px]">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                  <h2 className="font-serif text-xl font-bold text-charcoal-900">Order History</h2>
                  <span className="text-xs text-stone-500">{orders.length} orders placed</span>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-stone-500 py-10 text-center">No orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl bg-cream-50/60 border border-cream-200 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-charcoal-900">
                                Order #{ord.id}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-800 px-2 py-0.2 rounded-full">
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400">
                              Placed on {new Date(ord.createdAt).toLocaleDateString()} &bull; {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>

                          <Link
                            to={`/track-order?id=${ord.id}`}
                            className="px-3.5 py-1.5 bg-white hover:bg-cream-100 text-brand-700 border border-cream-300 rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors"
                          >
                            Track Order &rarr;
                          </Link>
                        </div>

                        <div className="pt-2 border-t border-cream-200/70 text-xs text-stone-600">
                          <p className="truncate">
                            <strong>Items:</strong>{' '}
                            {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Delivering to: {ord.shippingAddress.fullName}, {ord.shippingAddress.city}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Hampers Tab */}
            {activeTab === 'custom' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                  <h2 className="font-serif text-xl font-bold text-charcoal-900">
                    My Custom Hamper Requests
                  </h2>
                  <Link
                    to="/custom-hamper"
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    + Create New
                  </Link>
                </div>

                <div className="space-y-4">
                  {customRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-cream-50/60 border border-cream-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-charcoal-900">
                              Request #{req.id}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-800 px-2 py-0.2 rounded-full">
                              {req.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {req.occasion} for {req.recipient} &bull; Target Budget: {req.budget}
                          </p>
                        </div>

                        <span className="text-xs font-mono font-bold text-stone-700">
                          Qty: {req.quantity}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-cream-100">
                        <p>
                          <strong>Packaging:</strong> {req.packaging.name} &bull; <strong>Theme:</strong> {req.theme}
                        </p>
                        {req.personalMessage && (
                          <p className="italic text-stone-500 mt-1">"{req.personalMessage}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3">
                  Saved Delivery Addresses
                </h2>
                <div className="p-4 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal-900">Home (Primary)</span>
                    <span className="text-[10px] bg-brand-50 text-brand-600 px-2 py-0.2 rounded font-bold">
                      Default
                    </span>
                  </div>
                  <p className="text-stone-700">Pooja Sharma &bull; 9826012345</p>
                  <p className="text-stone-500">
                    Flat 402, Imperial Heights, Arera Colony, Bhopal, MP – 462016
                  </p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-cream-200 pb-3">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Pooja Sharma"
                      className="w-full px-3.5 py-2 border border-cream-300 rounded-xl bg-cream-50"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="9826012345"
                      className="w-full px-3.5 py-2 border border-cream-300 rounded-xl bg-cream-50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue="pooja.sharma@example.com"
                      className="w-full px-3.5 py-2 border border-cream-300 rounded-xl bg-cream-50"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Profile updated.')}
                  className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
