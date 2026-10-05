import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Products Inventory', path: '/admin/products', icon: Package },
    { name: 'Orders Pipeline', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Custom Hamper CRM', path: '/admin/custom-requests', icon: Sparkles },
    { name: 'Bulk & Events RFQ', path: '/admin/bulk-orders', icon: Users },
  ];

  return (
    <div className="bg-stone-100 min-h-screen flex flex-col font-sans">
      {/* Admin Top Navbar */}
      <header className="bg-charcoal-900 text-white border-b border-charcoal-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-serif font-bold text-base">
              LH
            </span>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight block leading-tight">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] text-gold-400 font-mono tracking-wider uppercase">
                Staff Management Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5 bg-charcoal-800 px-3 py-1.5 rounded-xl border border-charcoal-700 transition-colors"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </Link>
          </div>
        </div>

        {/* Sub-nav tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 border-t border-charcoal-800 text-xs">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-stone-300 hover:bg-charcoal-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
