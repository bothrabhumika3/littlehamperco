export type BulkOrderStatus =
  | 'New'
  | 'Reviewing'
  | 'Proposal Sent'
  | 'Confirmed'
  | 'In Production'
  | 'Completed'
  | 'Cancelled';

export interface BulkOrderRequest {
  id: string;
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  occasion: string;
  estimatedQuantity: number;
  budgetPerHamper: string;
  eventDate: string;
  deliveryCity: string;
  packagingPreference?: string;
  needsCustomBranding: boolean;
  notes: string;
  status: BulkOrderStatus;
  createdAt: string;
}
