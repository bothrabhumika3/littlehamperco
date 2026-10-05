import React from 'react';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { PenTool, Heart, Sparkles } from 'lucide-react';

export const StepMessage: React.FC = () => {
  const {
    personalMessage,
    hasHandwrittenNote,
    setPersonalMessage,
    customerName,
    customerPhone,
    deliveryLocation,
    eventDate,
    setCustomerInfo,
  } = useCustomHamperStore();

  const maxChars = 250;

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Add a Personal Touch
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          A heartfelt note transforms a gift into a keepsake that stays close to the heart forever.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-5">
        {/* Handwritten Note Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-cream-50 rounded-2xl border border-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal-900">
                Include Free Handwritten Calligraphy Note
              </p>
              <p className="text-[11px] text-stone-500">
                Inscribed with fountain pen on textured cotton paper
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasHandwrittenNote}
              onChange={(e) => setPersonalMessage(personalMessage, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
          </label>
        </div>

        {/* Message Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-charcoal-900">Your Personal Message</label>
            <span className="text-[11px] font-mono text-stone-400">
              {personalMessage.length}/{maxChars}
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={maxChars}
            placeholder="Write your heartfelt wishes here... e.g. Happy 30th Birthday Priya! May this new chapter bring you endless joy, laughter and adventures."
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value, hasHandwrittenNote)}
            className="w-full p-3.5 text-xs border border-cream-300 rounded-2xl focus:outline-none focus:border-brand-500 bg-cream-50 leading-relaxed"
          />
        </div>

        {/* Customer Details for Contact / Request */}
        <div className="pt-4 border-t border-cream-200 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Contact &amp; Delivery Details (Optional for Quote)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerInfo({ customerName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-cream-300 rounded-xl bg-cream-50 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">WhatsApp / Phone Number</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={customerPhone}
                onChange={(e) => setCustomerInfo({ customerPhone: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-cream-300 rounded-xl bg-cream-50 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Delivery City / Pin Code</label>
              <input
                type="text"
                placeholder="e.g. Bhopal, 462016"
                value={deliveryLocation}
                onChange={(e) => setCustomerInfo({ deliveryLocation: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-cream-300 rounded-xl bg-cream-50 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Target Delivery Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setCustomerInfo({ eventDate: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-cream-300 rounded-xl bg-cream-50 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
