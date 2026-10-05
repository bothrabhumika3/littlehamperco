export interface SiteConfig {
  brandName: string;
  founder: string;
  phone: string;
  secondaryPhone: string;
  currency: string;
  currencySymbol: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  location: string;
  city: string;
  freeDeliveryThreshold: number;
  defaultDeliveryFee: number;
  tagline: string;
  subtagline: string;
  announcementText: string;
  workingHours: string;
  orderHoursWeekday: string;
  orderHoursSunday: string;
  deliveryTime: string;
  returnPolicy: string;
  cancellationPolicy: string;
  deliverySlotAvailable: boolean;
  sameDayDeliveryCutoff: string;
}

export const siteConfig: SiteConfig = {
  brandName: "The Little Hamper Co.",
  founder: "Priya Bothra",
  phone: "7899140499",
  secondaryPhone: "7899140499",
  currency: "INR",
  currencySymbol: "₹",
  whatsapp: "7899140499",
  instagram: "the.littlehamperco",
  instagramHandle: "@the.littlehamperco",
  instagramUrl: "https://instagram.com/the.littlehamperco",
  email: "hello@littlehamperco.com",
  location: "Bangalore, Karnataka, India (Pan-India Shipping)",
  city: "Bangalore",
  freeDeliveryThreshold: 1999,
  defaultDeliveryFee: 150,
  tagline: "Thoughtful Gifting",
  subtagline: "Customized Gift Hampers, Corporate Gifting, Food Platters, Bouquets & Wedding Packing ~ By Priya Bothra",
  announcementText: "Thoughtfully packed. Delivery: 2–3 days | Time slots available | Contact: 7899140499",
  workingHours: "Mon - Sat: 10:00 AM – 9:00 PM | Sun: 10:00 AM – 6:00 PM",
  orderHoursWeekday: "10:00 AM – 9:00 PM",
  orderHoursSunday: "10:00 AM – 6:00 PM",
  deliveryTime: "2–3 days",
  returnPolicy: "No returns; replacement only",
  cancellationPolicy: "Pre-order cancellation: Full refund if cancelled within 24 hours",
  deliverySlotAvailable: true,
  sameDayDeliveryCutoff: "2:00 PM",
};

/**
 * Format an amount in INR with ₹ symbol and commas (e.g. ₹2,499)
 */
export function formatCurrency(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toLocaleString('en-IN')}`;
}

/**
 * Generate a pre-filled WhatsApp link
 */
export function getWhatsAppLink(message: string, phone: string = siteConfig.whatsapp): string {
  // Strip non-digits
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // Format with India country code 91 if not present
  const fullPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12 ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}
