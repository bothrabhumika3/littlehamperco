import React, { useState } from 'react';
import { productService } from '../../services/productService';
import { Product, ProductCategory, OccasionTag } from '../../types/product';
import { formatCurrency } from '../../config/siteConfig';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Package,
  RotateCcw,
  Search,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productService.getAllProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 1999,
    discountPrice: 2299,
    category: 'fresh-food',
    occasions: ['all'],
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'],
    packaging: 'Rigid Signature Gift Box with Ribbon',
    whatsInside: ['Artisanal chocolates', 'Gourmet roasted nuts', 'Scented candle'],
    stock: 25,
    tags: ['Gourmet', 'Luxury'],
    rating: 4.9,
    reviewCount: 15,
    bestseller: false,
    featured: false,
    sameDayDelivery: true,
    foodDetails: {
      weight: '1.2 kg',
      shelfLife: '6 months',
      isVegetarian: true,
      allergens: ['Nuts'],
      ingredients: ['Cocoa', 'Almonds'],
    },
  });

  const refreshProducts = () => {
    setProducts(productService.getAllProducts());
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      id: `prod-${Date.now()}`,
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      price: 1999,
      discountPrice: 2299,
      category: 'fresh-food',
      occasions: ['all'],
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'],
      packaging: 'Rigid Signature Gift Box with Ribbon',
      whatsInside: ['Artisanal chocolates', 'Gourmet roasted nuts', 'Scented candle'],
      stock: 25,
      tags: ['Gourmet', 'Gift'],
      rating: 4.9,
      reviewCount: 10,
      bestseller: false,
      featured: false,
      sameDayDelivery: true,
      foodDetails: {
        weight: '1.0 kg',
        shelfLife: '6 months',
        isVegetarian: true,
      },
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the live catalog?')) {
      productService.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const savedProduct: Product = {
      id: formData.id || `prod-${Date.now()}`,
      name: formData.name || 'Untitled Hamper',
      slug,
      shortDescription: formData.shortDescription || '',
      description: formData.description || '',
      price: Number(formData.price) || 0,
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      category: (formData.category as ProductCategory) || 'fresh-food',
      occasions: (formData.occasions as OccasionTag[]) || ['all'],
      images: formData.images || [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      ],
      packaging: formData.packaging || 'Rigid Box',
      whatsInside: formData.whatsInside || [],
      stock: Number(formData.stock) || 0,
      tags: formData.tags || [],
      rating: formData.rating || 4.9,
      reviewCount: formData.reviewCount || 12,
      bestseller: Boolean(formData.bestseller),
      featured: Boolean(formData.featured),
      sameDayDelivery: Boolean(formData.sameDayDelivery),
      createdAt: formData.createdAt || new Date().toISOString().split('T')[0],
      foodDetails: formData.foodDetails,
    };

    productService.saveProduct(savedProduct);
    refreshProducts();
    setIsModalOpen(false);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to standard 32 demo products?')) {
      productService.resetDefaults();
      refreshProducts();
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-950">
            Product Catalog &amp; Inventory
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage pricing, stocks, bestseller tags, and food allergen specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCatalog}
            className="px-3.5 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle"
            title="Reset to 32 Seed Products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-subtle flex items-center gap-2 text-xs">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search inventory by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none font-medium text-charcoal-900"
        />
        <span className="text-stone-400">{filtered.length} products</span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-4">Hamper</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / Discount</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-charcoal-900 block leading-tight">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="capitalize font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      {p.category.replace('-', ' ')}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-charcoal-900 block">
                      {formatCurrency(p.price)}
                    </span>
                    {p.discountPrice && (
                      <span className="text-[10px] text-stone-400 line-through">
                        {formatCurrency(p.discountPrice)}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stock > 10
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.bestseller && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold uppercase px-1.5 py-0.2 rounded">
                          Bestseller
                        </span>
                      )}
                      {p.featured && (
                        <span className="text-[9px] bg-purple-100 text-purple-800 font-bold uppercase px-1.5 py-0.2 rounded">
                          Featured
                        </span>
                      )}
                      {p.sameDayDelivery && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold uppercase px-1.5 py-0.2 rounded">
                          Same-Day
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 max-h-[90vh] overflow-y-auto space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                {editingProduct ? 'Edit Hamper' : 'Add New Hamper'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formData.category || 'fresh-food'}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50 font-medium"
                  >
                    <option value="fresh-food">Fresh Food Hampers</option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding &amp; Bridesmaid</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="corporate">Corporate</option>
                    <option value="festivals">Festivals</option>
                    <option value="chocolates">Chocolates</option>
                    <option value="dry-fruits">Dry Fruits</option>
                    <option value="snacks">Gourmet Snacks</option>
                    <option value="self-care">Self-Care</option>
                    <option value="personalized">Personalized</option>
                    <option value="return-gifts">Return Gifts</option>
                    <option value="luxury-hampers">Luxury Edits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Discount / Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.images?.[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Full Description</label>
                  <textarea
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">
                    Packaging Specification
                  </label>
                  <input
                    type="text"
                    value={formData.packaging || ''}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-stone-50"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestseller || false}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="rounded text-brand-500"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-brand-500"
                  />
                  <span>Featured Collection</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sameDayDelivery || false}
                    onChange={(e) => setFormData({ ...formData, sameDayDelivery: e.target.checked })}
                    className="rounded text-brand-500"
                  />
                  <span>Same-Day Eligible</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold uppercase tracking-wider shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
