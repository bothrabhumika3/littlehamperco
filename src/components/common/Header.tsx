import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  Phone,
  Gift,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { BrandLogo } from './BrandLogo';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);
  const location = useLocation();

  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOccasionsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Hampers', path: '/shop' },
    { name: 'Fresh Food', path: '/shop/fresh-food', badge: 'Fresh' },
    { name: 'Custom Hampers', path: '/custom-hamper', highlight: true },
    { name: 'Bulk & Events', path: '/bulk-gifting' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const occasionLinks = [
    { name: 'Birthdays', path: '/shop/birthday' },
    { name: 'Weddings & Bridesmaid', path: '/weddings' },
    { name: 'Baby Shower & Newborn', path: '/baby-shower' },
    { name: 'Anniversary', path: '/shop?occasion=anniversary' },
    { name: 'Corporate & Client', path: '/corporate' },
    { name: 'Festivals & Mithai', path: '/shop/festivals' },
    { name: 'Housewarming', path: '/shop?occasion=housewarming' },
    { name: 'Return Gifts', path: '/shop/return-gifts' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-cream-200/80 py-2.5'
          : 'bg-cream-50 border-b border-cream-200/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-charcoal-800 hover:text-brand-600 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-charcoal-800 hover:text-brand-600 lg:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link to="/" className="inline-block group">
              <BrandLogo />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              if (link.highlight) {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-brand-500/20'
                          : 'bg-brand-50 text-brand-700 border border-brand-200/80 hover:bg-brand-100/70'
                      }`
                    }
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    <span>{link.name}</span>
                    <span className="text-[9px] bg-brand-500 text-white uppercase px-1.5 py-0.2 rounded-full font-bold">
                      Build
                    </span>
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-wider font-semibold transition-colors relative py-1 hover:text-brand-600 ${
                      isActive ? 'text-brand-600' : 'text-charcoal-800'
                    }`
                  }
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1 text-[9px] font-bold bg-sage-100 text-sage-600 px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Occasions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOccasionsDropdownOpen(true)}
              onMouseLeave={() => setOccasionsDropdownOpen(false)}
            >
              <button
                className="text-xs uppercase tracking-wider font-semibold text-charcoal-800 hover:text-brand-600 flex items-center gap-1 py-1"
                aria-expanded={occasionsDropdownOpen}
              >
                <span>Occasions</span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-800" />
              </button>

              {occasionsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-card rounded-2xl animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <div className="bg-white rounded-2xl p-2 border border-cream-200/80 shadow-hover">
                    <div className="px-3 py-2 border-b border-cream-100 mb-1">
                      <p className="text-[11px] font-bold tracking-wider uppercase text-charcoal-800">
                        Celebrations &amp; Milestones
                      </p>
                    </div>
                    {occasionLinks.map((occ) => (
                      <Link
                        key={occ.name}
                        to={occ.path}
                        className="block px-3 py-2 text-xs text-charcoal-800 hover:bg-cream-100/70 hover:text-brand-600 rounded-lg transition-colors font-medium"
                      >
                        {occ.name}
                      </Link>
                    ))}
                    <div className="pt-2 mt-1 border-t border-cream-100 px-3 py-1.5">
                      <Link
                        to="/custom-hamper"
                        className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Need a custom occasion? &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button (Desktop) */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 text-xs text-charcoal-800 hover:text-charcoal-900 bg-cream-100/80 border border-cream-200/70 px-3 py-1.5 rounded-full transition-colors"
              aria-label="Search hampers"
            >
              <Search className="w-3.5 h-3.5 text-charcoal-800" />
              <span>Search hampers...</span>
              <kbd className="text-[10px] bg-white border border-cream-300 px-1.5 py-0.5 rounded text-charcoal-800 font-mono">
                /
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-charcoal-800 hover:text-brand-600 transition-colors rounded-full hover:bg-cream-100/70"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link
              to="/account"
              className="p-2 text-charcoal-800 hover:text-brand-600 transition-colors rounded-full hover:bg-cream-100/70"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* WhatsApp Quick Chat */}
            <a
              href={getWhatsAppLink('Hi Little Hamper Co.! I would like to enquire about a custom hamper.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <span className="font-serif text-lg font-bold text-charcoal-900">
                  {siteConfig.brandName}
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-charcoal-800 hover:bg-cream-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="p-4 space-y-1 flex-1">
              <Link
                to="/custom-hamper"
                className="flex items-center justify-between p-3.5 mb-3 bg-brand-50 border border-brand-200 text-brand-800 rounded-xl font-semibold text-sm shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Build Custom Hamper</span>
                </span>
                <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full uppercase">
                  Start
                </span>
              </Link>

              {navLinks
                .filter((l) => !l.highlight)
                .map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-cream-100 text-brand-600 font-semibold'
                          : 'text-charcoal-800 hover:bg-cream-50'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-sage-100 text-sage-600 px-2 py-0.5 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}

              <div className="pt-4 mt-2 border-t border-cream-200">
                <p className="text-[11px] font-bold tracking-wider uppercase text-charcoal-800 px-3 mb-2">
                  Popular Occasions
                </p>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {occasionLinks.map((occ) => (
                    <Link
                      key={occ.name}
                      to={occ.path}
                      className="text-xs text-charcoal-800 hover:text-brand-600 bg-cream-50/80 p-2.5 rounded-lg border border-cream-100 font-medium"
                    >
                      {occ.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Contact Quick Footer */}
            <div className="p-4 border-t border-cream-200 bg-cream-50 text-xs space-y-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-charcoal-800 hover:text-brand-600 font-medium"
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span>Call Us: {siteConfig.phone}</span>
              </a>
              <div className="text-[11px] text-charcoal-800">
                <span>Direct WhatsApp assistance: </span>
                <span className="font-semibold text-charcoal-800">{siteConfig.phone}</span>
              </div>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
};
