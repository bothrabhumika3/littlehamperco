import { BulkOrderRequest } from '../types/bulkOrder';
import { storageService } from './storageService';
import { getWhatsAppLink } from '../config/siteConfig';

const BULK_ORDERS_STORAGE_KEY = 'lhc_bulk_orders_v1';

const sampleBulkOrders: BulkOrderRequest[] = [
  {
    id: 'BLK-501',
    name: 'Rohit Mehta',
    companyName: 'Infosys Bhopal DC',
    phone: '9827099887',
    email: 'rohit.mehta@infosys.com',
    occasion: 'Corporate Diwali Celebration',
    estimatedQuantity: 120,
    budgetPerHamper: 'Classic Corporate Selection',
    eventDate: '2026-10-25',
    deliveryCity: 'Bhopal, MP',
    packagingPreference: 'Signature Navy Rigid Box with Company Logo Ribbon',
    needsCustomBranding: true,
    notes: 'Require mix of roasted nuts, craft chocolates, and customized metal pen with our logo.',
    status: 'Proposal Sent',
    createdAt: '2026-08-25T11:00:00Z',
  },
  {
    id: 'BLK-502',
    name: 'Sunita & Deepak Agrawal',
    phone: '9425123456',
    email: 'agrawal.weddings@gmail.com',
    occasion: 'Destination Wedding Welcome Hampers',
    estimatedQuantity: 80,
    budgetPerHamper: 'Premium Executive Edit',
    eventDate: '2026-11-20',
    deliveryCity: 'Udaipur, Rajasthan',
    packagingPreference: 'Handwoven Cane Baskets with Floral Brooch',
    needsCustomBranding: true,
    notes: 'Wedding suite hampers for guests. Include fresh fruit, kahwa tea, and welcome letter from parents.',
    status: 'Reviewing',
    createdAt: '2026-08-29T15:30:00Z',
  },
];

export const bulkOrderService = {
  getAllBulkOrders(): BulkOrderRequest[] {
    const stored = storageService.get<BulkOrderRequest[]>(BULK_ORDERS_STORAGE_KEY, []);
    if (!stored || stored.length === 0) {
      storageService.set(BULK_ORDERS_STORAGE_KEY, sampleBulkOrders);
      return sampleBulkOrders;
    }
    return stored;
  },

  createBulkOrder(data: Omit<BulkOrderRequest, 'id' | 'createdAt' | 'status'>): BulkOrderRequest {
    const newOrder: BulkOrderRequest = {
      ...data,
      id: `BLK-${Math.floor(500 + Math.random() * 500)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    const orders = this.getAllBulkOrders();
    const updated = [newOrder, ...orders];
    storageService.set(BULK_ORDERS_STORAGE_KEY, updated);

    return newOrder;
  },

  updateStatus(id: string, status: BulkOrderRequest['status']): void {
    const orders = this.getAllBulkOrders();
    const index = orders.findIndex((b) => b.id === id);
    if (index >= 0) {
      orders[index].status = status;
      storageService.set(BULK_ORDERS_STORAGE_KEY, orders);
    }
  },

  formatWhatsAppMessage(data: Partial<BulkOrderRequest>): string {
    return `🏢 *Little Hamper Co. Bulk / Event Gifting Enquiry* 🏢

*Client / Company:* ${data.name} ${data.companyName ? `(${data.companyName})` : ''}
*Phone:* ${data.phone}
*Occasion / Event:* ${data.occasion}
*Estimated Quantity:* ${data.estimatedQuantity} hampers
*Hamper Scale / Tier:* ${data.budgetPerHamper}
*Target Event Date:* ${data.eventDate || 'Flexible'}
*Delivery Location:* ${data.deliveryCity}
*Custom Branding Needed:* ${data.needsCustomBranding ? 'Yes (Logo / Custom cards)' : 'No'}
*Packaging Preference:* ${data.packagingPreference || 'Standard'}

*Special Requests / Notes:*
${data.notes || 'Please share catalog and quantity quotation.'}

Hi Little Hamper Co.! Please connect with us regarding a bulk proposal.`;
  },

  getWhatsAppUrl(data: Partial<BulkOrderRequest>): string {
    const text = this.formatWhatsAppMessage(data);
    return getWhatsAppLink(text);
  },
};
