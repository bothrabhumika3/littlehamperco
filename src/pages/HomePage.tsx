import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { QuickCategories } from '../components/home/QuickCategories';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { FreshFoodSection } from '../components/home/FreshFoodSection';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { CustomHamperTeaser } from '../components/home/CustomHamperTeaser';
import { SocialProofSection } from '../components/home/SocialProofSection';
import { InstagramGrid } from '../components/home/InstagramGrid';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { productService } from '../services/productService';
import { Product } from '../types/product';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const allProducts = productService.getAllProducts();

  return (
    <div className="space-y-0">
      <HeroSection />
      <QuickCategories />
      <BestsellersSection products={allProducts} onQuickView={setQuickViewProduct} />
      <FreshFoodSection products={allProducts} onQuickView={setQuickViewProduct} />
      <ShopByOccasion />
      <CustomHamperTeaser />
      <SocialProofSection />
      <InstagramGrid />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
