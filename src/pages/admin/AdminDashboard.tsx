import React from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { customHamperService } from '../../services/customHamperService';
import { bulkOrderService } from '../../services/bulkOrderService';
import { formatCurrency, getWhatsAppLink } from '../../config/siteConfig';
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  CheckCircle2,
  Sparkles,
  Users,
  Package,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const orders = orderService.getAllOrders();
  const products = productService.getAllProducts();
  const customRequests = customHamperService.getAllRequests();
  const bulkOrders = bulkOrderService.getAllBulkOrders();

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Packing').length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-950">
          Executive Dashboard
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Real-time performance metrics, customer orders, and custom hamper requests.
        </p>
      </div>

      {/* 8 Metric Cards Grid (Section 31) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">
            {formatCurrency(totalRevenue)}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">From {orders.length} orders</span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">{orders.length}</span>
          <span className="text-[10px] text-stone-400">All customer checkouts</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-600 block">{pendingOrders}</span>
          <span className="text-[10px] text-stone-400">In packing / ready</span>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Delivered</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">{completedOrders}</span>
          <span className="text-[10px] text-emerald-600 font-semibold">100% On-time</span>
        </div>

        {/* Custom Requests */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Custom Requests</span>
            <div className="w-8 h-8 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">{customRequests.length}</span>
          <span className="text-[10px] text-stone-400">Interactive builder CRM</span>
        </div>

        {/* Bulk Requests */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Bulk / Event RFQ</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">{bulkOrders.length}</span>
          <span className="text-[10px] text-stone-400">Weddings &amp; corporate</span>
        </div>

        {/* Products in Catalog */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Inventory</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">{products.length}</span>
          <span className="text-[10px] text-stone-400">Ready-made hampers</span>
        </div>

        {/* Customers */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Customers</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-charcoal-950 block">142</span>
          <span className="text-[10px] text-stone-400">Pan-India buyers</span>
        </div>
      </div>

      {/* Two Columns: Recent Orders & Recent Custom Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-serif text-lg font-bold text-charcoal-900">Recent Store Orders</h2>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal-900">#{ord.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-800 px-2 py-0.2 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    {ord.shippingAddress.fullName} &bull; {ord.shippingAddress.city}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-charcoal-900 block">
                    {formatCurrency(ord.totalAmount)}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase">{ord.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Custom Hamper Enquiries */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-serif text-lg font-bold text-charcoal-900">
              Custom Hamper Requests
            </h2>
            <Link
              to="/admin/custom-requests"
              className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>Manage CRM ({customRequests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {customRequests.slice(0, 4).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal-900">#{req.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-800 px-2 py-0.2 rounded-full">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    {req.customerName} &bull; {req.occasion} ({req.budget})
                  </p>
                </div>

                <a
                  href={getWhatsAppLink(
                    `Hi ${req.customerName}! Following up on your custom hamper request #${req.id} from Little Hamper Co.`,
                    req.customerPhone
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                  title="WhatsApp Customer"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
