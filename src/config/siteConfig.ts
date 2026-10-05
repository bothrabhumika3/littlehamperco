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
  sameDayDeliveryCutoff: string;
}

export const siteConfig: SiteConfig = {
  brandName: "The Little Hamper Co.",
  founder: "Priya Jain",
  phone: "7828966898",
  secondaryPhone: "7899140499",
  currency: "INR",
  currencySymbol: "₹",
  whatsapp: "7828966898",
  instagram: "the.littlehamperco",
  instagramHandle: "@the.littlehamperco",
  instagramUrl: "https://instagram.com/the.littlehamperco",
  email: "hello@littlehamperco.com",
  location: "Bangalore, Karnataka, India (Pan-India Shipping)",
  city: "Bangalore",
  freeDeliveryThreshold: 1999,
  defaultDeliveryFee: 150,
  tagline: "Thoughtful Gifting",
  subtagline: "Customized Gift Hampers, Corporate Gifting, Food Platters, Bouquets & Wedding Packing ~ By Priya Jain",
  announcementText: "Thoughtfully packed. Beautifully gifted. Bangalore & Pan-India Express Delivery.",
  workingHours: "Mon - Sun: 9:00 AM - 9:00 PM",
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
