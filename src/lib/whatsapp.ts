import { CartItem } from "@/context/CartContext";

interface OrderDetails {
    customerName: string;
    customerPhone: string;
    governorate: string;
    address: string;
    email?: string;
    notes?: string;
}

export function formatWhatsAppMessage(
    order: OrderDetails,
    cartItems: CartItem[],
    total: number,
    lang: "en" | "ar"
): string {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ar-IQ", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (lang === "ar") {
        let message = `🛍️ *طلب جديد من غريم ستور*\n\n`;
        message += `👤 *معلومات العميل:*\n`;
        message += `الاسم: ${order.customerName}\n`;
        message += `الهاتف: ${order.customerPhone}\n`;
        message += `المحافظة: ${order.governorate}\n`;
        message += `العنوان: ${order.address}\n`;
        if (order.email) message += `البريد الإلكتروني: ${order.email}\n`;
        if (order.notes) message += `ملاحظات: ${order.notes}\n`;

        message += `\n📦 *المنتجات:*\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name_ar || item.name_en}\n`;
            message += `   الكمية: ${item.quantity}\n`;
            message += `   السعر: ${formatPrice(item.price)}\n`;
            message += `   المجموع: ${formatPrice(item.price * item.quantity)}\n\n`;
        });

        message += `💰 *المجموع الكلي: ${formatPrice(total)}*\n\n`;
        message += `شكراً لطلبك من غريم ستور! 🙏`;

        return message;
    } else {
        let message = `🛍️ *New Order from Gharim Store*\n\n`;
        message += `👤 *Customer Information:*\n`;
        message += `Name: ${order.customerName}\n`;
        message += `Phone: ${order.customerPhone}\n`;
        message += `Governorate: ${order.governorate}\n`;
        message += `Address: ${order.address}\n`;
        if (order.email) message += `Email: ${order.email}\n`;
        if (order.notes) message += `Notes: ${order.notes}\n`;

        message += `\n📦 *Products:*\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name_en}\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ${formatPrice(item.price)}\n`;
            message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
        });

        message += `💰 *Total: ${formatPrice(total)}*\n\n`;
        message += `Thank you for your order from Gharim Store! 🙏`;

        return message;
    }
}

export function generateWhatsAppLink(phoneNumber: string, message: string): string {
    // Remove any non-numeric characters from phone number
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Return WhatsApp API link
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export const ADMIN_WHATSAPP_NUMBER = "964XXXXXXXXXX"; // Replace with actual admin number
