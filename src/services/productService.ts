import { Product, ProductCategory, OccasionTag } from '../types/product';
import { seedProducts } from '../data/seedProducts';
import { storageService } from './storageService';

const PRODUCTS_STORAGE_KEY = 'lhc_products_inventory_v2';

export const productService = {
  getAllProducts(): Product[] {
    const stored = storageService.get<Product[]>(PRODUCTS_STORAGE_KEY, []);
    if (!stored || stored.length === 0) {
      storageService.set(PRODUCTS_STORAGE_KEY, seedProducts);
      return seedProducts;
    }
    return stored;
  },

  getProductBySlug(slug: string): Product | undefined {
    const products = this.getAllProducts();
    return products.find((p) => p.slug === slug);
  },

  getProductById(id: string): Product | undefined {
    const products = this.getAllProducts();
    return products.find((p) => p.id === id);
  },

  getProductsByCategory(category: ProductCategory | 'all'): Product[] {
    const products = this.getAllProducts();
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  },

  getProductsByOccasion(occasion: OccasionTag): Product[] {
    const products = this.getAllProducts();
    if (occasion === 'all') return products;
    return products.filter((p) => p.occasions.includes(occasion) || p.occasions.includes('all'));
  },

  getBestsellers(): Product[] {
    return this.getAllProducts().filter((p) => p.bestseller);
  },

  getFeatured(): Product[] {
    return this.getAllProducts().filter((p) => p.featured);
  },

  searchProducts(query: string): Product[] {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return this.getAllProducts();

    // Check for price queries like "under 1500" or "< 2000"
    const underMatch = cleanQuery.match(/under\s*(\d+)/i) || cleanQuery.match(/<\s*(\d+)/i);
    const maxPrice = underMatch ? parseInt(underMatch[1], 10) : null;

    return this.getAllProducts().filter((p) => {
      if (maxPrice !== null && p.price <= maxPrice) {
        return true;
      }

      const matchName = p.name.toLowerCase().includes(cleanQuery);
      const matchDesc = p.description.toLowerCase().includes(cleanQuery) || p.shortDescription.toLowerCase().includes(cleanQuery);
      const matchCategory = p.category.toLowerCase().includes(cleanQuery);
      const matchOccasion = p.occasions.some((o) => o.toLowerCase().includes(cleanQuery));
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(cleanQuery));
      const matchIngredients = p.foodDetails?.ingredients?.some((i) => i.toLowerCase().includes(cleanQuery));
      const matchWhatsInside = p.whatsInside.some((w) => w.toLowerCase().includes(cleanQuery));

      return matchName || matchDesc || matchCategory || matchOccasion || matchTags || matchIngredients || matchWhatsInside;
    });
  },

  // Admin Actions
  saveProduct(product: Product): void {
    const products = this.getAllProducts();
    const existingIndex = products.findIndex((p) => p.id === product.id);
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.unshift(product);
    }
    storageService.set(PRODUCTS_STORAGE_KEY, products);
  },

  deleteProduct(id: string): void {
    const products = this.getAllProducts().filter((p) => p.id !== id);
    storageService.set(PRODUCTS_STORAGE_KEY, products);
  },

  resetDefaults(): void {
    storageService.set(PRODUCTS_STORAGE_KEY, seedProducts);
  },
};
