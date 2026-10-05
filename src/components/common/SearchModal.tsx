import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { productService } from '../../services/productService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '/' || (e.metaKey && e.key === 'k')) && !isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return productService.searchProducts(query).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  const quickPills = [
    'Birthday',
    'Chocolates',
    'Wedding',
    'Baby Shower',
    'Corporate',
    'Dry Fruits',
    'Luxury Trunks',
    'Fresh Fruits',
  ];

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleViewAllResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleViewAllResults} className="p-4 sm:p-5 border-b border-cream-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search hampers, bakes, dry fruits, occasions, or styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-sm sm:text-base font-medium text-charcoal-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-charcoal-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-charcoal-900 px-2 py-1"
          >
            Esc
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-3 bg-cream-50/70 border-b border-cream-200/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-500" />
            <span>Popular:</span>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {quickPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setQuery(pill)}
                className="px-2.5 py-1 bg-white hover:bg-cream-100 border border-cream-200 rounded-full text-stone-700 font-medium transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-stone-400">
              Type to search across our luxury gift collections, fresh food hampers, and occasions.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-charcoal-900 mb-1">
                No hampers matched "{query}"
              </p>
              <p className="text-xs text-stone-500 mb-4">
                Can't find what you need? We can create a 100% custom hamper for you.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/custom-hamper');
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
              >
                <span>Build Custom Hamper for this &rarr;</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-1">
                Products &amp; Hampers ({searchResults.length})
              </p>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-cream-50 border border-transparent hover:border-cream-200 transition-colors cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-cream-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-charcoal-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">{product.shortDescription}</p>
                    <span className="text-[10px] text-brand-600 font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
                      Customized Quote
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-cream-100 text-center">
                <button
                  type="button"
                  onClick={handleViewAllResults}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  <span>See all results for "{query}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
