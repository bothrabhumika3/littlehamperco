export type OccasionChoice =
  | 'Birthday'
  | 'Wedding'
  | 'Baby Shower'
  | 'Anniversary'
  | 'Housewarming'
  | 'Corporate'
  | 'Festival'
  | 'Bridesmaid'
  | 'Return Gift'
  | 'Thank You'
  | 'Congratulations'
  | 'Just Because'
  | 'Other';

export type RecipientChoice =
  | 'Friend'
  | 'Partner'
  | 'Parent'
  | 'Child'
  | 'Colleague'
  | 'Client'
  | 'Employee'
  | 'Wedding Guest'
  | 'Baby Shower Guest'
  | 'Other';

export type BudgetChoice =
  | 'Petite Gesture'
  | 'Classic Selection'
  | 'Grand Celebration'
  | 'Royal Luxury VIP'
  | 'Custom / Bespoke'
  | string;

export type HamperItemCategory =
  | 'Chocolates'
  | 'Snacks'
  | 'Dry Fruits'
  | 'Fresh Fruits'
  | 'Cookies'
  | 'Tea & Coffee'
  | 'Self-Care'
  | 'Candles'
  | 'Stationery'
  | 'Baby Items'
  | 'Personalized Items'
  | 'Decorative Items';

export interface HamperItemOption {
  id: string;
  name: string;
  category: HamperItemCategory;
  price: number;
  image: string;
  weightOrUnit?: string;
  isVegetarian?: boolean;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export type ThemeChoice =
  | 'Pastel'
  | 'Elegant'
  | 'Bright'
  | 'Minimal'
  | 'Traditional'
  | 'Luxury'
  | 'Rustic'
  | 'Custom';

export interface CustomHamperRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  occasion: OccasionChoice | string;
  recipient: RecipientChoice | string;
  budget: BudgetChoice | string;
  selectedItems: { item: HamperItemOption; quantity: number }[];
  packaging: PackagingOption;
  theme: ThemeChoice | string;
  customThemeDetails?: string;
  personalMessage: string;
  hasHandwrittenNote: boolean;
  quantity: number;
  eventDate?: string;
  deliveryLocation?: string;
  specialInstructions?: string;
  status: 'New' | 'Contacted' | 'Quote Sent' | 'Confirmed' | 'In Production' | 'Completed' | 'Cancelled';
  createdAt: string;
}
