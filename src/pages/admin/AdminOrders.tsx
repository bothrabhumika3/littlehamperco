import React, { useState } from 'react';
import { orderService } from '../../services/orderService';
import { Order, OrderStatus } from '../../types/order';
import { formatCurrency, siteConfig } from '../../config/siteConfig';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  Calendar,
  ChevronRight,
  Phone,
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(orderService.getAllOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Packing',
    'Ready',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = orderService.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders(orderService.getAllOrders());
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-950">
          Order Management Pipeline
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review customer orders, update tracking statuses, and coordinate dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Orders Table (Left) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <span className="font-serif text-base font-bold text-charcoal-900">
              All Orders ({orders.length})
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Date &amp; Slot</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedOrder(o)}
                    className={`cursor-pointer transition-colors ${
                      selectedOrder?.id === o.id ? 'bg-brand-50/40' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-charcoal-900">#{o.id}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-charcoal-900 block">
                        {o.shippingAddress.fullName}
                      </span>
                      <span className="text-[10px] text-stone-400">{o.shippingAddress.city}</span>
                    </td>
                    <td className="p-3.5 text-[11px] text-stone-600">
                      <span>{o.shippingAddress.deliveryDate}</span>
                      <span className="block text-[10px] text-stone-400">
                        {o.shippingAddress.deliverySlot.split(' ')[0]}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-charcoal-900">
                      {formatCurrency(o.totalAmount)}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                        className="text-[11px] font-semibold p-1 rounded-lg border border-stone-200 bg-stone-50 cursor-pointer"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <ChevronRight className="w-4 h-4 text-stone-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Inspector Card (Right) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-subtle space-y-4 sticky top-24">
          {selectedOrder ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="font-serif text-lg font-bold text-charcoal-900">
                    Order #{selectedOrder.id}
                  </span>
                  <p className="text-[11px] text-stone-400">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
                  {selectedOrder.status}
                </span>
              </div>

              {/* Status Update Quick Buttons */}
              <div>
                <label className="block font-bold text-stone-700 mb-1.5 uppercase text-[10px] tracking-wider">
                  Update Pipeline Status:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`p-1.5 rounded-lg border text-center transition-colors font-semibold ${
                        selectedOrder.status === st
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="pt-3 border-t border-stone-100 space-y-1">
                <span className="font-bold text-stone-400 uppercase text-[10px] block">
                  Delivery Destination
                </span>
                <p className="font-bold text-charcoal-900">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-stone-600">{selectedOrder.shippingAddress.addressLine}</p>
                <p className="text-stone-600">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} –{' '}
                  {selectedOrder.shippingAddress.pincode}
                </p>
                <a
                  href={`tel:${selectedOrder.shippingAddress.phone}`}
                  className="inline-flex items-center gap-1 text-brand-600 font-semibold hover:underline mt-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {selectedOrder.shippingAddress.phone}</span>
                </a>
              </div>

              {/* Items in Order */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <span className="font-bold text-stone-400 uppercase text-[10px] block">
                  Items Ordered
                </span>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 border-b border-stone-100">
                    <span className="font-medium text-charcoal-900">
                      {item.name} &times; {item.quantity}
                    </span>
                    <span className="font-bold text-stone-700">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {selectedOrder.shippingAddress.giftMessage && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-stone-700 italic">
                  <strong>Gift Note:</strong> "{selectedOrder.shippingAddress.giftMessage}"
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select any order from the table to inspect details or update shipping status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
