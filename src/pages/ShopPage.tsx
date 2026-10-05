import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product, ProductCategory, OccasionTag } from '../types/product';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  Search,
  Filter,
  Check,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppLink } from '../config/siteConfig';

export const ShopPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter States
  const urlSearch = searchParams.get('search') || '';
  const urlOccasion = (searchParams.get('occasion') as OccasionTag) || 'all';
  const urlFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categorySlug || searchParams.get('category') || 'all'
  );
  const [selectedOccasion, setSelectedOccasion] = useState<string>(urlOccasion);
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [sameDayOnly, setSameDayOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Sync with URL params
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  useEffect(() => {
    if (urlOccasion) {
      setSelectedOccasion(urlOccasion);
    }
  }, [urlOccasion]);

  const allProducts = productService.getAllProducts();

  const categoriesList = [
    { id: 'all', label: 'All Collections' },
    { id: 'fresh-food', label: 'Fresh Food Hampers' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'wedding', label: 'Weddings & Bridesmaid' },
    { id: 'baby-shower', label: 'Baby Shower & Newborn' },
    { id: 'corporate', label: 'Corporate Gifting' },
    { id: 'festivals', label: 'Festive & Mithai' },
    { id: 'chocolates', label: 'Chocolates' },
    { id: 'dry-fruits', label: 'Dry Fruits' },
    { id: 'snacks', label: 'Gourmet Snacks' },
    { id: 'self-care', label: 'Self-Care & Spa' },
    { id: 'personalized', label: 'Personalized' },
    { id: 'return-gifts', label: 'Return Gifts' },
    { id: 'luxury-hampers', label: 'Luxury Edits' },
  ];

  const occasionsList = [
    { id: 'all', label: 'All Occasions' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'housewarming', label: 'Housewarming' },
    { id: 'return-gifts', label: 'Return Gifts' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search query
    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.foodDetails?.ingredients?.some((i) => i.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Occasion filter
    if (selectedOccasion && selectedOccasion !== 'all') {
      result = result.filter(
        (p) => p.occasions.includes(selectedOccasion as OccasionTag) || p.occasions.includes('all')
      );
    }

    // Special url filter
    if (urlFilter === 'bestsellers') {
      result = result.filter((p) => p.bestseller);
    }

    // Dietary filter
    if (isVegOnly) {
      result = result.filter((p) => p.foodDetails?.isVegetarian === true);
    }

    // Same-day filter
    if (sameDayOnly) {
      result = result.filter((p) => p.sameDayDelivery === true);
    }

  // Sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }

    return result;
  }, [
    allProducts,
    urlSearch,
    selectedCategory,
    selectedOccasion,
    urlFilter,
    isVegOnly,
    sameDayOnly,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setIsVegOnly(false);
    setSameDayOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedOccasion !== 'all' ||
    isVegOnly ||
    sameDayOnly ||
    Boolean(urlSearch);

  return (
    <div className="bg-cream-50/60 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <Link to="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-charcoal-800 font-semibold">Shop Hampers</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-brand-600 font-semibold capitalize">
                  {selectedCategory.replace('-', ' ')}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
                {selectedCategory !== 'all'
                  ? categoriesList.find((c) => c.id === selectedCategory)?.label || 'Curated Hampers'
                  : 'All Curated Hampers'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredProducts.length} thoughtfully designed gifting hampers
                {urlSearch && <span> for "{urlSearch}"</span>}
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort Dropdown */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-white border border-cream-200 rounded-xl text-xs font-bold text-charcoal-800 flex items-center gap-2 shadow-subtle"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="flex items-center bg-white border border-cream-200 rounded-xl px-3 py-1.5 shadow-subtle text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 mr-2" />
                <span className="text-stone-500 mr-1.5 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-charcoal-900 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular Designs</option>
                  <option value="newest">Newest Inspirations</option>
                  <option value="rating">Customer Rating</option>
                  <option value="alphabetical">Alphabetical (A to Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bespoke Quote Inspiration Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-200 shadow-subtle mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 leading-tight">
                Design Inspiration Gallery
              </h3>
              <p className="text-xs text-stone-600 italic mt-0.5">
                “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to="/custom-hamper"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs text-center"
            >
              Custom Hamper Wizard
            </Link>
            <a
              href={getWhatsAppLink('Hi Little Hamper Co.! I would like to get a personalized quote for a custom hamper.')}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Quote</span>
            </a>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-2xl border border-cream-200 text-xs">
            <span className="text-stone-400 font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Category: {selectedCategory.replace('-', ' ')}
                <button onClick={() => setSelectedCategory('all')}>&times;</button>
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Occasion: {selectedOccasion}
                <button onClick={() => setSelectedOccasion('all')}>&times;</button>
              </span>
            )}
            {isVegOnly && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Vegetarian Only
                <button onClick={() => setIsVegOnly(false)}>&times;</button>
              </span>
            )}
            {sameDayOnly && (
              <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Same-Day Delivery
                <button onClick={() => setSameDayOnly(false)}>&times;</button>
              </span>
            )}
            {urlSearch && (
              <span className="inline-flex items-center gap-1 bg-cream-100 text-stone-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Search: "{urlSearch}"
                <button onClick={() => setSearchParams({})}>&times;</button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-stone-400 hover:text-rose-600 text-[11px] underline ml-auto"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Main Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-cream-200/80 shadow-subtle sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <span className="font-serif text-base font-bold text-charcoal-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                <span>Filters</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-stone-400 hover:text-brand-600 underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-2">
                Categories
              </h4>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-stone-600 hover:bg-cream-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="pt-4 border-t border-cream-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-2">
                Occasion
              </h4>
              <div className="space-y-1">
                {occasionsList.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedOccasion === occ.id
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-stone-600 hover:bg-cream-50'
                    }`}
                  >
                    <span>{occ.label}</span>
                    {selectedOccasion === occ.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Quote Guidance */}
            <div className="pt-4 border-t border-cream-100">
              <div className="p-3.5 bg-cream-50/80 rounded-2xl border border-cream-200 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-700">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Personalized Pricing</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed italic">
                  “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
                </p>
                <a
                  href={getWhatsAppLink('Hi Little Hamper Co.! I would like to get a personalized quote for a custom hamper.')}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Toggles: Dietary & Delivery */}
            <div className="pt-4 border-t border-cream-100 space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={isVegOnly}
                  onChange={(e) => setIsVegOnly(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-brand-400"
                />
                <span>100% Vegetarian Treats Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={sameDayOnly}
                  onChange={(e) => setSameDayOnly(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-brand-400"
                />
                <span>Same-Day Dispatch Eligible</span>
              </label>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-cream-200">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-3xl">
                  🎁
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                  No Hampers Match Your Selected Filters
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
                  Try clearing your filters or searching with different terms. Alternatively, use our custom builder to design a bespoke hamper tailored to your wishes.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="px-5 py-2.5 bg-cream-100 hover:bg-cream-200 text-charcoal-800 rounded-xl text-xs font-semibold"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    to="/custom-hamper"
                    className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-sm"
                  >
                    Build Custom Hamper
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-5 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cream-200 mb-4">
                <span className="font-serif text-lg font-bold text-charcoal-900">
                  Filter Hampers
                </span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:bg-cream-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-2">
                    Category
                  </h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50"
                  >
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-2">
                    Occasion
                  </h4>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 bg-cream-50"
                  >
                    {occasionsList.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs text-stone-600">
                  <p className="font-bold text-charcoal-900 mb-1">Personalized Quotes</p>
                  <p className="text-[11px] leading-relaxed italic">
                    “Every hamper is customized to your preferences and budget. Contact us for a personalized quote.”
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-cream-200">
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <input
                      type="checkbox"
                      checked={isVegOnly}
                      onChange={(e) => setIsVegOnly(e.target.checked)}
                      className="rounded text-brand-500"
                    />
                    <span>Vegetarian Treats Only</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <input
                      type="checkbox"
                      checked={sameDayOnly}
                      onChange={(e) => setSameDayOnly(e.target.checked)}
                      className="rounded text-brand-500"
                    />
                    <span>Same-Day Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200 flex gap-2">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 bg-cream-100 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
