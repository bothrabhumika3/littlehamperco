import React, { useState } from 'react';
import { customHamperService } from '../../services/customHamperService';
import { CustomHamperRequest } from '../../types/customHamper';
import { formatCurrency, getWhatsAppLink } from '../../config/siteConfig';
import { Sparkles, MessageCircle, Phone, Calendar, MapPin, Package, User } from 'lucide-react';

export const AdminCustomRequests: React.FC = () => {
  const [requests, setRequests] = useState<CustomHamperRequest[]>(
    customHamperService.getAllRequests()
  );
  const [selectedRequest, setSelectedRequest] = useState<CustomHamperRequest | null>(null);

  const statuses: CustomHamperRequest['status'][] = [
    'New',
    'Contacted',
    'Quote Sent',
    'Confirmed',
    'In Production',
    'Completed',
    'Cancelled',
  ];

  const handleStatusUpdate = (id: string, newStatus: CustomHamperRequest['status']) => {
    customHamperService.updateRequestStatus(id, newStatus);
    setRequests(customHamperService.getAllRequests());
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-950">
          Custom Hamper Builder CRM
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review customer specifications submitted through the interactive builder and follow up on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table List (Left) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Req ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Occasion &amp; Recipient</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Connect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className={`cursor-pointer transition-colors ${
                      selectedRequest?.id === req.id ? 'bg-brand-50/40' : 'hover:bg-stone-50/70'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-charcoal-900">#{req.id}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-charcoal-900 block">
                        {req.customerName}
                      </span>
                      <span className="text-[10px] text-stone-400">{req.customerPhone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-stone-700 block">{req.occasion}</span>
                      <span className="text-[10px] text-stone-400">For {req.recipient}</span>
                    </td>
                    <td className="p-3.5 font-mono text-stone-700">{req.budget}</td>
                    <td className="p-3.5">
                      <select
                        value={req.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          handleStatusUpdate(req.id, e.target.value as CustomHamperRequest['status'])
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
                          `Hi ${req.customerName}! Following up from Little Hamper Co. regarding your custom hamper request #${req.id} for ${req.occasion}.`,
                          req.customerPhone
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

        {/* Selected Request Inspector (Right) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-subtle space-y-4 sticky top-24">
          {selectedRequest ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="font-serif text-lg font-bold text-charcoal-900">
                    Request #{selectedRequest.id}
                  </span>
                  <p className="text-[10px] text-stone-400">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full">
                  {selectedRequest.status}
                </span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-bold text-stone-700 mb-1 uppercase text-[10px] tracking-wider">
                  Update CRM Status:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusUpdate(selectedRequest.id, st)}
                      className={`p-1.5 rounded-lg border text-center transition-colors font-semibold ${
                        selectedRequest.status === st
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact */}
              <div className="pt-3 border-t border-stone-100 space-y-1">
                <span className="font-bold text-stone-400 uppercase text-[10px] block">
                  Customer Contact
                </span>
                <p className="font-bold text-charcoal-900">{selectedRequest.customerName}</p>
                <p className="text-stone-600">Phone: {selectedRequest.customerPhone}</p>
                {selectedRequest.deliveryLocation && (
                  <p className="text-stone-600">Location: {selectedRequest.deliveryLocation}</p>
                )}
                {selectedRequest.eventDate && (
                  <p className="text-stone-600">Event Date: {selectedRequest.eventDate}</p>
                )}
              </div>

              {/* Selected Items */}
              <div className="pt-3 border-t border-stone-100 space-y-1.5">
                <span className="font-bold text-stone-400 uppercase text-[10px] block">
                  Curated Products ({selectedRequest.selectedItems.length})
                </span>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {selectedRequest.selectedItems.map((i, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 px-2 rounded bg-stone-50 text-[11px]"
                    >
                      <span>
                        {i.item.name} &times; {i.quantity}
                      </span>
                      <span className="font-bold">{formatCurrency(i.item.price * i.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging & Theme */}
              <div className="pt-3 border-t border-stone-100 text-stone-700 space-y-1">
                <p>
                  <strong>Packaging:</strong> {selectedRequest.packaging.name}
                </p>
                <p>
                  <strong>Theme:</strong> {selectedRequest.theme}{' '}
                  {selectedRequest.customThemeDetails && `(${selectedRequest.customThemeDetails})`}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedRequest.quantity} hamper(s)
                </p>
              </div>

              {selectedRequest.personalMessage && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-stone-700 italic">
                  <strong>Personal Message:</strong> "{selectedRequest.personalMessage}"
                </div>
              )}

              {/* Direct WhatsApp CTA */}
              <a
                href={getWhatsAppLink(
                  customHamperService.formatWhatsAppMessage(selectedRequest),
                  selectedRequest.customerPhone
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Customer on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select any custom hamper request from the list to review details and chat.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
