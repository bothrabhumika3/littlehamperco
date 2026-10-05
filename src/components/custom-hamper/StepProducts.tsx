import React, { useState } from 'react';
import { hamperCustomItems } from '../../data/customHamperOptions';
import { HamperItemCategory, HamperItemOption } from '../../types/customHamper';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { Plus, Minus, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

export const StepProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<HamperItemCategory | 'All'>('All');
  const { selectedItems, addItem, removeItem, updateItemQuantity, getItemsSubtotal, budget } =
    useCustomHamperStore();

  const totalItemCount = selectedItems.reduce((acc, i) => acc + i.quantity, 0);

  const categories: (HamperItemCategory | 'All')[] = [
    'All',
    'Chocolates',
    'Dry Fruits',
    'Fresh Fruits',
    'Snacks',
    'Cookies',
    'Tea & Coffee',
    'Self-Care',
    'Candles',
    'Stationery',
    'Baby Items',
    'Decorative Items',
    'Personalized Items',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? hamperCustomItems
      : hamperCustomItems.filter((i) => i.category === activeCategory);

  const currentSubtotal = getItemsSubtotal();

  const getItemQuantity = (id: string) => {
    const found = selectedItems.find((i) => i.item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Curate Your Delights
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Pick your preferred artisanal chocolates, fresh bakes, exotic fruits, or pampering treats.
        </p>
      </div>

      {/* Live Running Total Banner */}
      <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal-900">
              Selected Products ({selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)})
            </p>
            <p className="text-[11px] text-stone-500">
              Hamper Scale: <strong className="text-charcoal-800">{budget}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Items Added
            </span>
            <span className="text-xl font-bold text-brand-600">
              {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white hover:bg-cream-100 text-charcoal-800 border border-cream-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id);

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between ${
                qty > 0 ? 'border-brand-500 bg-brand-50/20' : 'border-cream-200/80'
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-cream-100">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[9px] font-bold uppercase tracking-wider text-charcoal-800 px-2 py-0.5 rounded-full border border-cream-200">
                  {item.category}
                </span>

                {qty > 0 && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {qty}
                  </span>
                )}
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                  {item.weightOrUnit && (
                    <span className="text-[10px] text-stone-400 font-medium">
                      {item.weightOrUnit}
                    </span>
                  )}
                </div>

                <div className="pt-3 mt-2 border-t border-cream-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                    Choice
                  </span>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      className="p-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-brand-300 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-cream-100"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-charcoal-900">{qty}</span>
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-cream-100"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItems.length === 0 && (
        <div className="text-center py-6 bg-cream-50 rounded-2xl border border-cream-200 text-xs text-stone-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-brand-500" />
          <span>Please select at least 2 to 3 items to build your hamper.</span>
        </div>
      )}
    </div>
  );
};
