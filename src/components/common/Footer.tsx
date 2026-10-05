import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner & Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-charcoal-800 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">Bespoke Curation</h3>
              <p className="text-xs text-stone-400">Hand-packed with personal handwritten notes</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-sage-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">Finest Quality Treats</h3>
              <p className="text-xs text-stone-400">A-grade produce, craft confection &amp; luxury packing</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-brand-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">Direct WhatsApp Care</h3>
              <p className="text-xs text-stone-400">Instant assistance from our curation specialists</p>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="inline-block">
              <BrandLogo variant="white" />
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              Customized Gift Hampers, Corporate Gifting, Food Platters, Bouquets &amp; Wedding Packing.
            </p>
            <p className="text-xs text-gold-300 italic font-serif">
              ~ Curated by Priya Jain, Bangalore
            </p>
            <div className="text-xs text-stone-400 space-y-1.5 pt-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{siteConfig.phone} / {siteConfig.secondaryPhone}</span>
              </p>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link to="/shop/fresh-food" className="hover:text-white transition-colors">
                  Fresh Food Hampers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Ready-Made Hampers
                </Link>
              </li>
              <li>
                <Link to="/shop/birthday" className="hover:text-white transition-colors">
                  Birthday Hampers
                </Link>
              </li>
              <li>
                <Link to="/weddings" className="hover:text-white transition-colors">
                  Wedding Hampers
                </Link>
              </li>
              <li>
                <Link to="/baby-shower" className="hover:text-white transition-colors">
                  Baby Shower Gifting
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:text-white transition-colors">
                  Corporate Hampers
                </Link>
              </li>
              <li>
                <Link to="/shop/personalized" className="hover:text-white transition-colors">
                  Personalized Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">Help &amp; Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/contact#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact#delivery" className="hover:text-white transition-colors">
                  Delivery &amp; Shipping
                </Link>
              </li>
              <li>
                <Link to="/contact#returns" className="hover:text-white transition-colors">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link to="/contact#cancellation" className="hover:text-white transition-colors">
                  Order Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">Business &amp; Services</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link to="/bulk-gifting" className="hover:text-white transition-colors">
                  Bulk &amp; Event Gifting
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:text-white transition-colors">
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link to="/custom-hamper" className="hover:text-white transition-colors">
                  Create Custom Hamper
                </Link>
              </li>
              <li>
                <Link to="/weddings" className="hover:text-white transition-colors">
                  Wedding Welcome Curation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">Connect With Us</h4>
            <p className="text-xs text-stone-400 mb-3">
              Have a question or custom vision? We're available 7 days a week.
            </p>
            <div className="space-y-2 mb-4">
              <a
                href={getWhatsAppLink('Hi Little Hamper Co.! I would like to enquire about a hamper.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-stone-200 hover:text-white bg-charcoal-800 p-2 rounded-xl border border-charcoal-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {siteConfig.phone}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-xs text-stone-200 hover:text-white bg-charcoal-800 p-2 rounded-xl border border-charcoal-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>Call: {siteConfig.phone}</span>
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-stone-200 hover:text-white bg-charcoal-800 p-2 rounded-xl border border-charcoal-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram: {siteConfig.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="border-t border-charcoal-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; {currentYear} {siteConfig.brandName}. All rights reserved. Thoughtfully made for every moment.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <Link to="/contact#privacy" className="hover:text-stone-200 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/contact#terms" className="hover:text-stone-200 transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link to="/contact#shipping" className="hover:text-stone-200 transition-colors">
              Shipping Policy
            </Link>
            <span>&bull;</span>
            <Link to="/contact#refund" className="hover:text-stone-200 transition-colors">
              Refund Policy
            </Link>
            <span>&bull;</span>
            <Link to="/admin" className="text-stone-400 hover:text-gold-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
