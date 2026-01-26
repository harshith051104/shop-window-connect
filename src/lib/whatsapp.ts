// WhatsApp configuration
// Update this phone number with your shop's WhatsApp number (with country code, no + or spaces)
export const WHATSAPP_NUMBER = "919849850425"; // Example: India +91 followed by 10-digit number

export const SHOP_INFO = {
  name: "Nandi Stationery & Gifts",
  tagline: "Your Neighbourhood Stationery Partner",
  address: "Veerabhadra Nagar, Sangareddy, Telangana 502001",
  phone: "+91 98498 50425",
  timings: "Mon-Sat: 9:00 AM - 9:00 PM | Sunday: 10:00 AM - 8:00 PM",
  whatsappNumber: WHATSAPP_NUMBER,
};

// Generate WhatsApp URL with pre-filled message
export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Pre-filled messages for different scenarios
export function getOrderMessage(items?: string): string {
  const baseMessage = `🛒 *New Order Inquiry*\n\nHello! I would like to place an order.\n\n`;
  if (items) {
    return baseMessage + `*Items:*\n${items}\n\nPlease confirm availability and total price.`;
  }
  return baseMessage + `Please share your available items and prices.`;
}

export function getRequestItemMessage(itemName: string, quantity?: string, urgency?: string): string {
  let message = `📋 *Item Request*\n\nHello! I am looking for an item that may not be in your regular stock.\n\n`;
  message += `*Item Name:* ${itemName}\n`;
  if (quantity) message += `*Quantity Needed:* ${quantity}\n`;
  if (urgency) message += `*Urgency:* ${urgency}\n`;
  message += `\nPlease let me know if you can arrange this item and the expected price. Thank you!`;
  return message;
}

export function getGeneralInquiryMessage(): string {
  return `👋 Hello! I have a question about your stationery/gift items. Can you help me?`;
}

export function getBulkOrderMessage(): string {
  return `📦 *Bulk Order Inquiry*\n\nHello! I am interested in placing a bulk order.\n\nPlease share details about:\n- Available items for bulk orders\n- Bulk pricing/discounts\n- Delivery options\n\nThank you!`;
}
