import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomHamperPage } from './pages/CustomHamperPage';
import { BulkGiftingPage } from './pages/BulkGiftingPage';
import { WeddingGiftingPage } from './pages/WeddingGiftingPage';
import { BabyShowerPage } from './pages/BabyShowerPage';
import { CorporateGiftingPage } from './pages/CorporateGiftingPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomRequests } from './pages/admin/AdminCustomRequests';
import { AdminBulkOrders } from './pages/admin/AdminBulkOrders';

/**
 * Scroll to top of window on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Main Layout Wrapper to conditionally omit consumer Header/Footer in Admin section
 */
function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <AnnouncementBar />}
      {!isAdmin && <Header onOpenSearch={() => setIsSearchOpen(true)} />}

      <main className="flex-grow">{children}</main>

      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:categorySlug" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/custom-hamper" element={<CustomHamperPage />} />
          <Route path="/bulk-gifting" element={<BulkGiftingPage />} />
          <Route path="/weddings" element={<WeddingGiftingPage />} />
          <Route path="/baby-shower" element={<BabyShowerPage />} />
          <Route path="/corporate" element={<CorporateGiftingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="custom-requests" element={<AdminCustomRequests />} />
            <Route path="bulk-orders" element={<AdminBulkOrders />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
