import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { useCartStore } from '../../store/useCartStore';
import { customHamperService } from '../../services/customHamperService';
import { siteConfig } from '../../config/siteConfig';
import {
  ShoppingBag,
  MessageCircle,
  Send,
  CheckCircle2,
  Gift,
  ArrowLeft,
  Sparkles,
  Package,
} from 'lucide-react';

export const StepSummary: React.FC = () => {
  const navigate = useNavigate();
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const {
    occasion,
    recipient,
    budget,
    selectedItems,
    packaging,
    theme,
    customThemeDetails,
    personalMessage,
    hasHandwrittenNote,
    quantity,
    customerName,
    customerPhone,
    deliveryLocation,
    eventDate,
    setCustomerInfo,
    getItemsSubtotal,
    getTotalPerHamper,
    getGrandTotal,
    resetHamper,
  } = useCustomHamperStore();

  const addItemToCart = useCartStore((state) => state.addItem);

  const itemsSubtotal = getItemsSubtotal();
  const perHamperTotal = getTotalPerHamper();
  const grandTotal = getGrandTotal();

  // WhatsApp link with prefilled selections
  const whatsappUrl = customHamperService.getWhatsAppUrl({
    occasion,
    recipient,
    budget,
    selectedItems,
    packaging,
    theme,
    customThemeDetails,
    personalMessage,
    hasHandwrittenNote,
    quantity,
    customerName,
    customerPhone,
    deliveryLocation,
    eventDate,
  });

  const handleAddToCart = () => {
    // Construct custom hamper item for cart
    addItemToCart({
      name: `Custom Hamper: ${occasion} for ${recipient}`,
      price: perHamperTotal,
      quantity: quantity || 1,
      image:
        packaging.image ||
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      customConfig: {
        occasion,
        recipient,
        theme,
        packaging,
        personalMessage,
        hasHandwrittenNote,
        items: selectedItems.map((i) => ({
          name: i.item.name,
          price: i.item.price,
          quantity: i.quantity,
        })),
      },
    });

    navigate('/cart');
  };

  const handleRequestMyHamper = (e: React.FormEvent) => {
    e.preventDefault();
    const req = customHamperService.createRequest({
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || siteConfig.phone,
      occasion,
      recipient,
      budget,
      selectedItems,
      packaging,
      theme,
      customThemeDetails,
      personalMessage,
      hasHandwrittenNote,
      quantity: quantity || 1,
      deliveryLocation,
      eventDate,
    });

    setSubmittedId(req.id);
    setRequestSubmitted(true);
  };

  if (requestSubmitted) {
    return (
      <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl border border-cream-200 shadow-xl text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-charcoal-900">
          Enquiry Received with Love!
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Your request <strong className="text-brand-600">#{submittedId}</strong> has been logged with our head curation team. We will review your selections and connect with you on WhatsApp / call at <strong>{customerPhone || siteConfig.phone}</strong> shortly.
        </p>

        <div className="pt-4 flex flex-col gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp Now</span>
          </a>

          <button
            onClick={() => {
              resetHamper();
              navigate('/');
            }}
            className="text-xs text-stone-500 hover:text-brand-600 font-semibold"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Review Your Custom Hamper
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Everything is carefully aligned to your specifications before we begin crafting.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Specification Summary */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                Celebration
              </span>
              <h4 className="font-serif text-lg font-bold text-charcoal-900 leading-tight">
                {occasion} &bull; For {recipient}
              </h4>
            </div>
            <span className="text-xs font-mono font-bold bg-cream-100 text-charcoal-800 px-2.5 py-1 rounded-full border border-cream-200">
              Scale: {budget}
            </span>
          </div>

          {/* Selected Products List */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Curated Goodies ({selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)} items):
            </p>
            {selectedItems.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No specific products selected (Chef's surprise choice)</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedItems.map(({ item, quantity: qty }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-cream-50/70 border border-cream-100"
                  >
                    <span className="font-medium text-charcoal-900 truncate mr-2">
                      {item.name} &times; {qty}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-600 shrink-0">
                      Included
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Packaging & Theme Specs */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cream-200 text-xs">
            <div className="bg-cream-50/70 p-3 rounded-2xl border border-cream-100">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Packaging</span>
              <span className="font-bold text-charcoal-900 block mt-0.5">{packaging.name}</span>
              <span className="text-[10px] text-stone-500">Curated &amp; Finished</span>
            </div>

            <div className="bg-cream-50/70 p-3 rounded-2xl border border-cream-100">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Color Theme</span>
              <span className="font-bold text-charcoal-900 block mt-0.5">{theme}</span>
              {customThemeDetails && (
                <span className="text-[10px] text-stone-500 truncate block">
                  {customThemeDetails}
                </span>
              )}
            </div>
          </div>

          {/* Personal Note */}
          <div className="pt-2 border-t border-cream-100 text-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Personal Greeting Card Note
            </span>
            <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100/80 italic text-stone-700">
              "{personalMessage || 'No personal message provided. You can include one later!'}"
            </div>
            {hasHandwrittenNote && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold-700 mt-1.5">
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>Handwritten calligraphy note requested</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Financials & Triple Action Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-4">
            <h4 className="font-serif text-lg font-bold text-charcoal-900 border-b border-cream-200 pb-3">
              Hamper Summary
            </h4>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-600">Hamper Quantity</span>
              <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-cream-50">
                <button
                  type="button"
                  onClick={() => setCustomerInfo({ quantity: Math.max(1, (quantity || 1) - 1) })}
                  className="px-2.5 py-1 text-stone-600 hover:bg-cream-200"
                >
                  -
                </button>
                <span className="px-3 font-bold text-charcoal-900">{quantity || 1}</span>
                <button
                  type="button"
                  onClick={() => setCustomerInfo({ quantity: (quantity || 1) + 1 })}
                  className="px-2.5 py-1 text-stone-600 hover:bg-cream-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-cream-100">
              <div className="flex justify-between">
                <span>Selected Items</span>
                <span className="font-semibold text-charcoal-900">
                  {selectedItems.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>
              <div className="flex justify-between">
                <span>Packaging Choice</span>
                <span className="font-semibold text-charcoal-900">{packaging.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Hamper Scale Tier</span>
                <span className="font-bold text-brand-600">{budget || 'Custom Selection'}</span>
              </div>
              <div className="pt-2 mt-1 border-t border-cream-200">
                <p className="text-[11px] text-stone-600 italic bg-cream-50 p-2.5 rounded-xl border border-cream-200 leading-snug">
                  ✨ <strong>Bespoke Curation:</strong> Every hamper is customized to your preferences and style. We will share your personalized quote and styling photos upon review.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            {/* Primary Action 1: Talk on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Quote on WhatsApp ({siteConfig.phone})</span>
            </a>

            {/* Action 2: Submit to CRM */}
            <button
              type="button"
              onClick={handleRequestMyHamper}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Custom Request (We'll Call You)</span>
            </button>

            {/* Secondary Action 3: Request / Save to CRM */}
            <button
              type="button"
              onClick={handleRequestMyHamper}
              className="w-full py-2.5 bg-cream-100 hover:bg-cream-200 text-charcoal-800 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-cream-200"
            >
              <Send className="w-3.5 h-3.5 text-stone-500" />
              <span>Submit Custom Request (We'll Call You)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
