# Little Hamper Co. — Premium E-Commerce & Custom Hamper Platform

> **"Little Hampers. Big Moments."**  
> Thoughtfully packed. Beautifully gifted. Made for every celebration, milestone, and little moment.

A modern, responsive, full-featured gifting e-commerce and interactive custom-hamper building platform built specifically for **Little Hamper Co.**

---

## 🌟 Executive Highlights

1. **Dual Core Customer Journeys:**
   - **Journey A (Ready-Made Shopping):** Browse 32+ artisan hampers across Fresh Food, Chocolates, Dry Fruits, Birthdays, Weddings, Corporate, Baby Showers, and Festivals. Full transparency on food ingredients, allergens, weights, and storage.
   - **Journey B (Interactive Custom Hamper Builder):** An 8-step visual wizard (`/custom-hamper`) that guides customers through Occasion, Recipient, Budget, Product Selection with live running totals, Packaging (Cane baskets, velvet trunks, rigid boxes), Color/Themes, Handwritten Notes, and instant WhatsApp / Cart hand-off.
2. **Specialized Portals:**
   - **Fresh Food Hampers (`/shop/fresh-food`):** Climate-safe dispatch, A-grade orchard picks, full dietary and allergen clarity.
   - **Weddings & Bridesmaids (`/weddings`):** Destination suite welcome hampers, bridesmaid proposal trunks, groomsmen dapper sets.
   - **Baby Showers & Newborns (`/baby-shower`):** Organic cotton swaddles, mom-to-be pampering, and milestone journals.
   - **Corporate & Executive Gifting (`/corporate` & `/bulk-gifting`):** Employee onboarding kits, festival hampers, and an interactive RFQ quote calculator with direct WhatsApp communication.
3. **Checkout & Mock Payment:**
   - Delivery date scheduling and slot selection (Morning, Afternoon, Evening).
   - Real-time coupon engine (`WELCOME10`, `HAMPERLOVE`, `FESTIVE15`).
   - Mock payment options: UPI (GPay/PhonePe), Card, Net Banking, and Cash/UPI on Delivery.
   - Live Order Tracking (`/track-order`) with a 6-stage visual timeline.
4. **Staff Management Console (`/admin`):**
   - Live KPI dashboard (Revenue, Orders, Custom Requests, Bulk RFQs, Inventory).
   - Product Catalog CRUD (Add, edit, delete, stock levels, bestseller flags).
   - Order Status Pipeline (Pending &rarr; Confirmed &rarr; Packing &rarr; Ready &rarr; Out for Delivery &rarr; Delivered).
   - Custom Hamper CRM with 1-click WhatsApp customer connection.
   - Bulk & Event Inquiries tracker.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3.4 (Custom luxury palette: Warm Creams, Champagne Gold, Terracotta & Sage)
- **Typography:** Cormorant Garamond & Playfair Display (Serif headings) + Plus Jakarta Sans (Clean body)
- **Icons:** Lucide React
- **State Management:** Zustand (with LocalStorage persistence for Cart, Wishlist, Custom Builder, Orders, and Product Inventory)
- **Routing:** React Router v7
- **Celebrations:** Canvas Confetti

---

## 📁 Directory Structure

```
littlehamperco/
├── public/
│   ├── favicon.svg             # Handcrafted ribbon hamper monogram
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # Complete XML sitemap
├── src/
│   ├── config/
│   │   └── siteConfig.ts       # Central brand config (Phone: 7828966898, Currency: ₹, URLs)
│   ├── types/
│   │   ├── product.ts          # Product, Food transparency, Category, Occasions
│   │   ├── customHamper.ts     # 8-step Custom hamper types & packaging
│   │   ├── order.ts            # Cart, Shipping Address, Payment, Order Status
│   │   └── bulkOrder.ts        # Bulk RFQ quote structure
│   ├── data/
│   │   ├── seedCategories.ts   # 12 categories with curated photography
│   │   ├── seedProducts.ts     # 32+ realistic demo products with INR prices & food specs
│   │   ├── customHamperOptions.ts # Builder catalog, packaging options, and color themes
│   │   ├── mockOrders.ts       # Initial demo orders for tracking
│   │   └── mockReviews.ts      # Sample customer testimonials
│   ├── services/
│   │   ├── productService.ts   # LocalStorage CRUD + seed fallback
│   │   ├── cartService.ts      # Pricing calculations, delivery thresholds, coupons
│   │   ├── orderService.ts     # Order placement & 6-stage status history
│   │   ├── customHamperService.ts # Custom requests CRM & WhatsApp message generator
│   │   ├── bulkOrderService.ts # Bulk RFQ enquiries & WhatsApp formatter
│   │   └── storageService.ts   # Typed LocalStorage helper
│   ├── store/
│   │   ├── useCartStore.ts     # Persistent cart state & slide-over drawer
│   │   ├── useWishlistStore.ts # Persistent wishlist state
│   │   └── useCustomHamperStore.ts # Multi-step builder state machine
│   ├── components/
│   │   ├── common/             # AnnouncementBar, Header, Footer, FloatingWhatsApp, ProductCard, QuickViewModal, CartDrawer, SearchModal
│   │   ├── home/               # HeroSection, QuickCategories, ShopByOccasion, FreshFoodSection, BestsellersSection, CustomHamperTeaser, SocialProofSection, InstagramGrid
│   │   └── custom-hamper/      # StepOccasion, StepRecipient, StepBudget, StepProducts, StepPackaging, StepTheme, StepMessage, StepSummary, ProgressBar
│   ├── pages/
│   │   ├── HomePage.tsx        # Storefront homepage
│   │   ├── ShopPage.tsx        # Catalog with search, facet filters & sorting
│   │   ├── ProductDetailPage.tsx # PDP with full food information & buy box
│   │   ├── CustomHamperPage.tsx # /custom-hamper 8-step builder
│   │   ├── BulkGiftingPage.tsx # /bulk-gifting quote request calculator
│   │   ├── WeddingGiftingPage.tsx # /weddings
│   │   ├── BabyShowerPage.tsx  # /baby-shower
│   │   ├── CorporateGiftingPage.tsx # /corporate
│   │   ├── CartPage.tsx        # Full cart & promo codes
│   │   ├── CheckoutPage.tsx    # Address, delivery scheduling, mock payment
│   │   ├── OrderConfirmationPage.tsx # Celebration & summary
│   │   ├── OrderTrackingPage.tsx # /track-order live timeline
│   │   ├── WishlistPage.tsx    # Saved products
│   │   ├── AccountPage.tsx     # Orders & addresses
│   │   ├── AboutPage.tsx       # Authentic brand story & 5 core pillars
│   │   ├── ContactPage.tsx     # Enquiries form & FAQs
│   │   └── admin/              # AdminLayout, Dashboard, Products, Orders, CustomRequests, BulkOrders
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
└── tailwind.config.js
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Installation
```bash
# Clone or navigate into the directory
cd littlehamperco

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## ⚙️ Configuration

The central configuration file is located at `src/config/siteConfig.ts`:

```typescript
export const siteConfig = {
  brandName: "Little Hamper Co.",
  phone: "7828966898",
  currency: "INR",
  currencySymbol: "₹",
  whatsapp: "7828966898",
  instagram: "[ADD INSTAGRAM]",
  instagramHandle: "@littlehamperco",
  instagramUrl: "https://instagram.com/littlehamperco",
  email: "hello@littlehamperco.com", // [ADD EMAIL]
  location: "Bhopal / Indore, MP, India (Pan-India Shipping)", // [ADD LOCATION]
  freeDeliveryThreshold: 1999,
  defaultDeliveryFee: 150,
  tagline: "Little Hampers. Big Moments.",
  subtagline: "Beautifully curated hampers, packed with love for every celebration, milestone and little moment.",
  announcementText: "Thoughtfully packed. Beautifully gifted. Made for every occasion.",
  workingHours: "Mon - Sun: 9:00 AM - 9:00 PM",
  sameDayDeliveryCutoff: "2:00 PM",
};
```

---

## 💳 Future Integrations

### 1. Razorpay Payment Gateway
The checkout architecture is designed for direct Razorpay drop-in:
1. In `src/pages/CheckoutPage.tsx`, load Razorpay's checkout script (`https://checkout.razorpay.com/v1/checkout.js`).
2. Replace the simulated `setTimeout` block with `new window.Razorpay(options).open()`.
3. Verify signature on your server or Supabase Edge Function. Never expose your Razorpay Secret Key in frontend code.

### 2. Delivery & Logistics API Integration
The shipping and order model is aligned with Shiprocket / Delhivery / Borzo standards:
- Order weight, pickup PIN code, and recipient PIN code are tracked.
- Add webhook listener in `orderService.ts` to sync status updates (`Packing` &rarr; `Ready for Dispatch` &rarr; `Out for Delivery` &rarr; `Delivered`).

### 3. Supabase / PostgreSQL Database
To migrate from LocalStorage persistence to Supabase:
1. Initialize `@supabase/supabase-js`.
2. Connect `productService`, `orderService`, `customHamperService`, and `bulkOrderService` to query corresponding Supabase tables (`products`, `orders`, `custom_hamper_requests`, `bulk_orders`).
3. Set Row Level Security (RLS) policies for user data protection.

---

## 🌐 Deployment Instructions

### Deploying on Vercel
1. Push this repository to GitHub / GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Deploying on Netlify
1. Connect your repository in [Netlify](https://netlify.com).
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.
4. Ensure `_redirects` or single-page rewrite (`/* /index.html 200`) is active.

---

## 📞 Support & Contacts
- **Brand:** Little Hamper Co.
- **Phone / WhatsApp:** 7828966898
- **Hours:** Monday to Sunday, 9:00 AM – 9:00 PM
