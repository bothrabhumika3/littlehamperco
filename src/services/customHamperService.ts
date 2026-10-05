import { CustomHamperRequest } from '../types/customHamper';
import { storageService } from './storageService';
import { getWhatsAppLink } from '../config/siteConfig';

const CUSTOM_REQUESTS_STORAGE_KEY = 'lhc_custom_hamper_requests_v1';

const sampleCustomRequests: CustomHamperRequest[] = [
  {
    id: 'REQ-9102',
    customerName: 'Meera Singhal',
    customerPhone: '9826198765',
    customerEmail: 'meera@singhal.in',
    occasion: 'Bridesmaid',
    recipient: 'Friend',
    budget: 'Grand Celebration',
    selectedItems: [
      {
        item: {
          id: 'item-choc-1',
          name: 'Belgian Dark Chocolate Truffles (6 pcs)',
          category: 'Chocolates',
          price: 350,
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'item-candle-1',
          name: 'French Lavender & Amber Soy Wax Candle',
          category: 'Candles',
          price: 350,
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'item-selfcare-2',
          name: 'Mulberry Silk Sleep Eye Mask with Pouch',
          category: 'Self-Care',
          price: 450,
          image: '',
        },
        quantity: 1,
      },
    ],
    packaging: {
      id: 'luxury-trunk',
      name: 'Heritage Velvet Trunk',
      price: 650,
      description: 'Lined in royal velvet with brass clasps',
      image: '',
    },
    theme: 'Pastel',
    personalMessage: 'To my dearest bridesmaid, couldn’t do this without you!',
    hasHandwrittenNote: true,
    quantity: 6,
    eventDate: '2026-11-15',
    deliveryLocation: 'Jaipur, Rajasthan',
    specialInstructions: 'Need custom rose gold ribbon matching our bridal lehenga tone.',
    status: 'Quote Sent',
    createdAt: '2026-08-30T14:20:00Z',
  },
  {
    id: 'REQ-8841',
    customerName: 'Aarav Patel',
    customerPhone: '9425011223',
    occasion: 'Housewarming',
    recipient: 'Colleague',
    budget: 'Classic Selection',
    selectedItems: [
      {
        item: {
          id: 'item-dryfruit-1',
          name: 'Jumbo California Roasted Almonds',
          category: 'Dry Fruits',
          price: 340,
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'item-brew-1',
          name: 'Darjeeling First Flush Tea Caddy',
          category: 'Tea & Coffee',
          price: 360,
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'item-decor-1',
          name: 'Brass Lotus Tealight Diya',
          category: 'Decorative Items',
          price: 390,
          image: '',
        },
        quantity: 1,
      },
    ],
    packaging: {
      id: 'handwoven-basket',
      name: 'Handwoven Cane Basket',
      price: 399,
      description: 'Artisanal wicker basket with champagne ribbon',
      image: '',
    },
    theme: 'Traditional',
    personalMessage: 'Wishing you abundant warmth and prosperity in your gorgeous new home!',
    hasHandwrittenNote: true,
    quantity: 1,
    deliveryLocation: 'Bhopal, MP',
    status: 'New',
    createdAt: '2026-09-01T09:15:00Z',
  },
];

export const customHamperService = {
  getAllRequests(): CustomHamperRequest[] {
    const stored = storageService.get<CustomHamperRequest[]>(CUSTOM_REQUESTS_STORAGE_KEY, []);
    if (!stored || stored.length === 0) {
      storageService.set(CUSTOM_REQUESTS_STORAGE_KEY, sampleCustomRequests);
      return sampleCustomRequests;
    }
    return stored;
  },

  createRequest(data: Omit<CustomHamperRequest, 'id' | 'createdAt' | 'status'>): CustomHamperRequest {
    const newRequest: CustomHamperRequest = {
      ...data,
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    const requests = this.getAllRequests();
    const updated = [newRequest, ...requests];
    storageService.set(CUSTOM_REQUESTS_STORAGE_KEY, updated);

    return newRequest;
  },

  updateRequestStatus(id: string, status: CustomHamperRequest['status']): void {
    const requests = this.getAllRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index >= 0) {
      requests[index].status = status;
      storageService.set(CUSTOM_REQUESTS_STORAGE_KEY, requests);
    }
  },

  formatWhatsAppMessage(request: Partial<CustomHamperRequest>): string {
    const itemsList = request.selectedItems && request.selectedItems.length > 0
      ? request.selectedItems.map((i) => `• ${i.item.name} (x${i.quantity})`).join('\n')
      : 'Curated by Little Hamper Co.';

    return `✨ *Little Hamper Co. Custom Hamper Enquiry* ✨

*Occasion:* ${request.occasion || 'Not specified'}
*Recipient:* ${request.recipient || 'Not specified'}
*Hamper Scale:* ${request.budget || 'Custom Selection'}
*Quantity:* ${request.quantity || 1}
*Packaging:* ${request.packaging?.name || 'Classic'}
*Aesthetic / Theme:* ${request.theme || 'Elegant'}${request.customThemeDetails ? ` (${request.customThemeDetails})` : ''}

🎁 *Selected Products:*
${itemsList}

✍️ *Personal Message:*
"${request.personalMessage || 'No personal message'}"
*Handwritten Note:* ${request.hasHandwrittenNote ? 'Yes please' : 'Standard card'}

${request.deliveryLocation ? `📍 *Location:* ${request.deliveryLocation}\n` : ''}${request.eventDate ? `📅 *Event Date:* ${request.eventDate}\n` : ''}
Hi Little Hamper Co.! I would love your help finalizing and creating this bespoke hamper.`;
  },

  getWhatsAppUrl(request: Partial<CustomHamperRequest>): string {
    const text = this.formatWhatsAppMessage(request);
    return getWhatsAppLink(text);
  },
};
