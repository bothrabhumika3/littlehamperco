import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { productService } from '../services/productService';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types/product';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlistStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const allProducts = productService.getAllProducts();
  const wishlistedProducts = allProducts.filter((p) => items.includes(p.id));

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-600">
              Saved Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 mt-1">
              Your Wishlist ({wishlistedProducts.length})
            </h1>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-stone-400 hover:text-rose-600 underline self-start sm:self-auto"
            >
              Clear All Favorites
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-cream-200 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
              Save your favorite luxury hampers, seasonal fruits, or artisanal bakes here so you can easily find them later.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-block shadow-sm"
            >
              Explore Hampers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
