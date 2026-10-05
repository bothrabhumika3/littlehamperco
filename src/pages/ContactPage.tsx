import React, { useState } from 'react';
import { siteConfig, getWhatsAppLink } from '../config/siteConfig';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: 'General enquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reasons = [
    'General enquiry',
    'Custom hamper',
    'Wedding',
    'Baby shower',
    'Corporate',
    'Bulk order',
    'Other',
  ];

  const faqs = [
    {
      q: 'Do you deliver all across India?',
      a: 'Yes! We deliver across 19,000+ PIN codes in India. Metro cities usually arrive within 2-3 business days, and express local deliveries are supported with same-day dispatch when ordered before 2:00 PM.',
    },
    {
      q: 'How does the Custom Hamper Builder work?',
      a: 'Simply choose the occasion, recipient, target budget, and handpick products from our live catalog. We will pack everything in your chosen packaging, tie it with luxury ribbons, and inscribe your personal handwritten note.',
    },
    {
      q: 'Can fresh fruit hampers be shipped safely?',
      a: 'Absolutely. All fresh food and fruit hampers are packed with temperature-safe, shock-absorbent cushioning and dispatched via expedited priority courier to ensure orchard freshness upon delivery.',
    },
    {
      q: 'Do you handle bulk corporate and wedding return favors?',
      a: 'Yes! Bulk gifting is one of our specialities. We offer customized packaging with company logos or wedding monograms, custom branded ribbons, and tiered volume pricing. Contact us on WhatsApp or request a quote on /bulk-gifting.',
    },
    {
      q: 'Can I include a handwritten letter?',
      a: 'Yes, every hamper includes a complimentary handwritten card note inscribed with fountain pen calligraphy by our studio team.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = `Hi Little Hamper Co.!
Name: ${formData.name || 'Friend'}
Reason: ${formData.reason}
Message: ${formData.message || 'I would like to enquire about your hampers.'}`;

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
            We’re Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-950 tracking-tight mt-1">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Have a custom vision, urgent delivery request, or bulk enquiry? We'd love to chat.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Direct Call &amp; Studio</span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-base font-bold text-charcoal-900 hover:text-brand-600 transition-colors block"
              >
                {siteConfig.phone}
              </a>
              <span className="text-xs text-stone-500 font-medium">Alt: {siteConfig.secondaryPhone}</span>
              <p className="text-xs text-stone-400 mt-1">{siteConfig.workingHours}</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Instant WhatsApp
              </span>
              <a
                href={getWhatsAppLink('Hi Little Hamper Co.! I would like assistance with a hamper.')}
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold text-charcoal-900 hover:text-emerald-600 transition-colors block"
              >
                {siteConfig.phone}
              </a>
              <p className="text-xs text-stone-500 mt-1">Quickest responses (Typically &lt; 15 mins)</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Bangalore Studio Hub</span>
              <p className="text-sm font-bold text-charcoal-900">{siteConfig.location}</p>
              <p className="text-xs text-stone-500 mt-1">Curated by Priya Jain &bull; Pan-India Dispatch</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Side Promo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200/90 shadow-subtle">
            <h2 className="font-serif text-2xl font-bold text-charcoal-950 mb-1">
              Send an Enquiry
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Fill out your details below and our team will get back to you promptly.
            </p>

            {isSubmitted ? (
              <div className="p-8 text-center bg-cream-50 rounded-2xl border border-cream-200 space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-charcoal-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We have received your message regarding <strong>{formData.reason}</strong> and will contact you via WhatsApp / email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-brand-600 underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-900 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-900 mb-1">
                      Reason for Enquiry *
                    </label>
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 font-medium"
                    >
                      {reasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-900 mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you are looking for, expected dates, or specific dietary requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>

                  <a
                    href={getWhatsAppLink(whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right FAQs Accordion */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200/90 shadow-subtle space-y-4" id="faqs">
            <h3 className="font-serif text-xl font-bold text-charcoal-950">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-cream-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-cream-50/70"
                    >
                      <span className="text-xs font-bold text-charcoal-900">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          isOpen ? 'rotate-180 text-brand-500' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-stone-600 leading-relaxed bg-cream-50/40 border-t border-cream-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
