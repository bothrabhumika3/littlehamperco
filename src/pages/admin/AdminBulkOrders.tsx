import React, { useState } from 'react';
import { bulkOrderService } from '../../services/bulkOrderService';
import { BulkOrderRequest, BulkOrderStatus } from '../../types/bulkOrder';
import { getWhatsAppLink } from '../../config/siteConfig';
import { Users, MessageCircle, Phone, Calendar, Building, Package } from 'lucide-react';

export const AdminBulkOrders: React.FC = () => {
  const [orders, setOrders] = useState<BulkOrderRequest[]>(bulkOrderService.getAllBulkOrders());
  const [selectedOrder, setSelectedOrder] = useState<BulkOrderRequest | null>(null);

  const statuses: BulkOrderStatus[] = [
    'New',
    'Reviewing',
    'Proposal Sent',
    'Confirmed',
    'In Production',
    'Completed',
    'Cancelled',
  ];

  const handleStatusChange = (id: string, newStatus: BulkOrderStatus) => {
    bulkOrderService.updateStatus(id, newStatus);
    setOrders(bulkOrderService.getAllBulkOrders());
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-950">
          Bulk &amp; Event Gifting Inquiries
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage wedding welcome orders, corporate festival hampers, and event proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">RFQ ID</th>
                  <th className="p-3.5">Client / Company</th>
                  <th className="p-3.5">Event &amp; Quantity</th>
                  <th className="p-3.5">Budget / Hamper</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Connect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedOrder(b)}
                    className={`cursor-pointer transition-colors ${
                      selectedOrder?.id === b.id ? 'bg-brand-50/40' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-charcoal-900">#{b.id}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-charcoal-900 block">{b.name}</span>
                      {b.companyName && (
                        <span className="text-[10px] text-stone-400 block">{b.companyName}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-stone-800 block">{b.occasion}</span>
                      <span className="text-[10px] text-stone-400 font-bold">
                        {b.estimatedQuantity} hampers
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-stone-700">{b.budgetPerHamper}</td>
                    <td className="p-3.5">
                      <select
                        value={b.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          handleStatusChange(b.id, e.target.value as BulkOrderStatus)
                        }
                        className="text-[11px] font-semibold p-1 rounded-lg border border-stone-200 bg-stone-50"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <a
                        href={getWhatsAppLink(
                          `Hi ${b.name}! Following up regarding your bulk gifting enquiry #${b.id} (${b.occasion} - ${b.estimatedQuantity} hampers) from Little Hamper Co.`,
                          b.phone
                        )}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Inspector Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-subtle space-y-4 sticky top-24">
          {selectedOrder ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="font-serif text-lg font-bold text-charcoal-900">
                    Bulk RFQ #{selectedOrder.id}
                  </span>
                  <p className="text-[10px] text-stone-400">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                  {selectedOrder.status}
                </span>
              </div>

              {/* Status Update */}
              <div>
                <label className="block font-bold text-stone-700 mb-1 uppercase text-[10px] tracking-wider">
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

              {/* Client Info */}
              <div className="pt-3 border-t border-stone-100 space-y-1">
                <span className="font-bold text-stone-400 uppercase text-[10px] block">
                  Client &amp; Event
                </span>
                <p className="font-bold text-charcoal-900">
                  {selectedOrder.name}{' '}
                  {selectedOrder.companyName && `(${selectedOrder.companyName})`}
                </p>
                <p className="text-stone-600">Phone: {selectedOrder.phone}</p>
                <p className="text-stone-600">Email: {selectedOrder.email}</p>
                <p className="text-stone-600">Occasion: {selectedOrder.occasion}</p>
                <p className="text-stone-600">Quantity: {selectedOrder.estimatedQuantity} hampers</p>
                <p className="text-stone-600">Budget: {selectedOrder.budgetPerHamper}</p>
                <p className="text-stone-600">Target City: {selectedOrder.deliveryCity}</p>
                {selectedOrder.eventDate && (
                  <p className="text-stone-600">Date: {selectedOrder.eventDate}</p>
                )}
                <p className="text-stone-600">
                  Custom Branding:{' '}
                  <strong className={selectedOrder.needsCustomBranding ? 'text-emerald-700' : 'text-stone-500'}>
                    {selectedOrder.needsCustomBranding ? 'Yes, required' : 'Standard'}
                  </strong>
                </p>
              </div>

              {selectedOrder.notes && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700">
                  <strong>Notes:</strong> {selectedOrder.notes}
                </div>
              )}

              {/* WhatsApp Action */}
              <a
                href={getWhatsAppLink(
                  bulkOrderService.formatWhatsAppMessage(selectedOrder),
                  selectedOrder.phone
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Follow up on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select any bulk inquiry from the table to view proposal specifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
