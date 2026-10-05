export type ProductCategory =
  | 'fresh-food'
  | 'chocolates'
  | 'dry-fruits'
  | 'snacks'
  | 'self-care'
  | 'birthday'
  | 'wedding'
  | 'baby-shower'
  | 'corporate'
  | 'festivals'
  | 'personalized'
  | 'return-gifts'
  | 'luxury-hampers';

export type OccasionTag =
  | 'birthday'
  | 'wedding'
  | 'baby-shower'
  | 'anniversary'
  | 'corporate'
  | 'festivals'
  | 'housewarming'
  | 'return-gifts'
  | 'bridesmaid'
  | 'self-care'
  | 'all';

export type DietaryTag = 'vegetarian' | 'eggless' | 'gluten-free' | 'vegan' | 'sugar-free';

export interface ProductFoodDetails {
  ingredients?: string[];
  allergens?: string[];
  weight?: string;
  shelfLife?: string;
  storageInstructions?: string;
  bestBefore?: string;
  isVegetarian?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  location?: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: ProductCategory;
  occasions: OccasionTag[];
  images: string[];
  packaging: string;
  whatsInside: string[];
  foodDetails?: ProductFoodDetails;
  stock: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  sameDayDelivery?: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  slug: string;
  description: string;
  image: string;
  isFreshFood?: boolean;
}
