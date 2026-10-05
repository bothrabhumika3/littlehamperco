import React, { useState } from 'react';
import { bulkOrderService } from '../services/bulkOrderService';
import { siteConfig } from '../config/siteConfig';
import {
  Briefcase,
  Users,
  Sparkles,
  Send,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Building2,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';

export const BulkGiftingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    occasion: 'Corporate Event',
    estimatedQuantity: 50,
    budgetPerHamper: 'Classic Corporate Selection',
    eventDate: '',
    deliveryCity: '',
    packagingPreference: 'Signature Rigid Boxes with Custom Ribbon',
    needsCustomBranding: true,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const occasions = [
    'Corporate Diwali / Festive',
    'Employee Appreciation / Milestones',
    'New Hire Onboarding Kits',
    'Wedding Welcome Hampers',
    'Wedding Return Favors',
    'Baby Shower / Mom & Baby Favors',
    'VIP Client Gifting',
    'Conference / Annual Summit',
    'Other Event',
  ];

  const budgetTiers = [
    'Petite / Token Favors',
    'Classic Corporate Selection',
    'Premium Executive Edit',
    'Grand Royal Trunks',
    'Custom Scale (Discuss on Call)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = bulkOrderService.createBulkOrder({
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      occasion: formData.occasion,
      estimatedQuantity: Number(formData.estimatedQuantity) || 25,
      budgetPerHamper: formData.budgetPerHamper,
      eventDate: formData.eventDate,
      deliveryCity: formData.deliveryCity,
      packagingPreference: formData.packagingPreference,
      needsCustomBranding: formData.needsCustomBranding,
      notes: formData.notes,
    });

    setSubmittedId(req.id);
    setSubmitted(true);
  };

  const whatsappUrl = bulkOrderService.getWhatsAppUrl(formData);

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Corporate, Weddings &amp; Events</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-950 tracking-tight leading-tight">
            Gifting for Every Gathering
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            From 20 executive hampers to 1,000 wedding favors across India, Little Hamper Co. handles end-to-end bespoke packaging, custom logo branding, and timely dispatch.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                Custom Corporate Branding
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Add your company logo, employee names, branded ribbons, and customized greeting letters to every hamper.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                Curated To Your Budget
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We craft tailored proposals that maximize value, pairing premium dry fruits, gourmet confectionery, and lifestyle items.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1">
                Multi-City Doorstep Dispatch
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We can ship in bulk to your event venue or deliver individually to remote employee homes across 19,000+ pin codes.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Request Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-cream-200/90 shadow-card">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                Bulk Quote Request Submitted!
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>! Your inquiry ref is <strong className="text-brand-600">#{submittedId}</strong>. Our bulk gifting manager will review your specs and send a digital catalog &amp; quotation within 4 business hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-cream-100 text-charcoal-800 rounded-xl text-xs font-semibold hover:bg-cream-200"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-cream-200 pb-4">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                  Request a Bulk Quote
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Fill out this brief form and our team will get back to you with custom catalog samples.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp / Agrawal Wedding"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Occasion / Event Type *
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 font-medium"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Estimated Hamper Quantity *
                  </label>
                  <input
                    type="number"
                    min={10}
                    required
                    placeholder="e.g. 50"
                    value={formData.estimatedQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedQuantity: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Hamper Scale / Tier *
                  </label>
                  <select
                    value={formData.budgetPerHamper}
                    onChange={(e) => setFormData({ ...formData, budgetPerHamper: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 font-medium"
                  >
                    {budgetTiers.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Event / Target Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Delivery City / Destination *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai / Bhopal / Multiple Remote Addresses"
                    value={formData.deliveryCity}
                    onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>
              </div>

              {/* Checkbox: Custom Branding */}
              <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-charcoal-900">Custom Logo &amp; Event Branding</p>
                  <p className="text-[11px] text-stone-500">
                    Include your company logo or wedding monogram printed on ribbons and greeting cards
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.needsCustomBranding}
                  onChange={(e) =>
                    setFormData({ ...formData, needsCustomBranding: e.target.checked })
                  }
                  className="w-4 h-4 text-brand-500 rounded"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-charcoal-900 mb-1">
                  Special Notes or Product Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Vegetarian snacks only, need mix of artisanal coffee and dry fruits, looking for delivery before October 15..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Request a Bulk Quote</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({siteConfig.phone})</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
