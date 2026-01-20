"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatWhatsAppMessage, generateWhatsAppLink, ADMIN_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const IRAQI_GOVERNORATES = [
    "Baghdad - بغداد",
    "Basra - البصرة",
    "Nineveh - نينوى",
    "Erbil - أربيل",
    "Sulaymaniyah - السليمانية",
    "Duhok - دهوك",
    "Anbar - الأنبار",
    "Diyala - ديالى",
    "Karbala - كربلاء",
    "Najaf - النجف",
    "Wasit - واسط",
    "Saladin - صلاح الدين",
    "Kirkuk - كركوك",
    "Maysan - ميسان",
    "Dhi Qar - ذي قار",
    "Muthanna - المثنى",
    "Qadisiyyah - القادسية",
    "Babil - بابل",
];

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const { lang } = useLanguage();
    const router = useRouter();

    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        governorate: "",
        address: "",
        email: "",
        notes: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ar-IQ", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = lang === "en" ? "Name is required" : "الاسم مطلوب";
        }

        if (!formData.customerPhone.trim()) {
            newErrors.customerPhone = lang === "en" ? "Phone is required" : "رقم الهاتف مطلوب";
        } else if (!/^07[3-9]\d{8}$/.test(formData.customerPhone.replace(/\s/g, ""))) {
            newErrors.customerPhone = lang === "en"
                ? "Invalid Iraqi phone number"
                : "رقم هاتف عراقي غير صحيح";
        }

        if (!formData.governorate) {
            newErrors.governorate = lang === "en" ? "Governorate is required" : "المحافظة مطلوبة";
        }

        if (!formData.address.trim()) {
            newErrors.address = lang === "en" ? "Address is required" : "العنوان مطلوب";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = lang === "en" ? "Invalid email address" : "بريد إلكتروني غير صحيح";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (cart.length === 0) return;

        setIsSubmitting(true);

        try {
            const total = getCartTotal();
            const message = formatWhatsAppMessage(formData, cart, total, lang);
            const whatsappLink = generateWhatsAppLink(ADMIN_WHATSAPP_NUMBER, message);

            // Open WhatsApp
            window.open(whatsappLink, "_blank");

            // Clear cart and redirect
            setTimeout(() => {
                clearCart();
                router.push("/order-success");
            }, 1000);
        } catch (error) {
            console.error("Error submitting order:", error);
            alert(lang === "en" ? "Error submitting order" : "خطأ في إرسال الطلب");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-6xl">🛒</div>
                <h2 className="text-2xl font-bold text-brown">
                    {lang === "en" ? "Your cart is empty" : "العلاگه فارغة"}
                </h2>
                <button
                    onClick={() => router.push("/products")}
                    className="mt-4 px-6 py-3 bg-brown text-white rounded-lg hover:opacity-90 transition"
                >
                    {lang === "en" ? "Browse Products" : "تصفح المنتجات"}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-brown mb-8 text-center"
                >
                    {lang === "en" ? "Checkout" : "إتمام الطلب"}
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-brown mb-6">
                                {lang === "en" ? "Customer Information" : "معلومات العميل"}
                            </h2>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Full Name" : "الاسم الكامل"} *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-brown transition ${errors.customerName ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder={lang === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                                    />
                                    {errors.customerName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Phone Number" : "رقم الهاتف"} *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.customerPhone}
                                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                                        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-brown transition ${errors.customerPhone ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="07XXXXXXXXX"
                                        dir="ltr"
                                    />
                                    {errors.customerPhone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                                    )}
                                </div>

                                {/* Governorate */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Governorate" : "المحافظة"} *
                                    </label>
                                    <select
                                        value={formData.governorate}
                                        onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                                        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-brown transition ${errors.governorate ? "border-red-500" : "border-gray-300"
                                            }`}
                                    >
                                        <option value="">
                                            {lang === "en" ? "Select Governorate" : "اختر المحافظة"}
                                        </option>
                                        {IRAQI_GOVERNORATES.map((gov) => (
                                            <option key={gov} value={gov}>
                                                {gov}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.governorate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Detailed Address" : "العنوان التفصيلي"} *
                                    </label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-brown transition ${errors.address ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder={lang === "en" ? "Street, area, landmarks..." : "الشارع، المنطقة، معالم بارزة..."}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* Email (Optional) */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Email (Optional)" : "البريد الإلكتروني (اختياري)"}
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-brown transition ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder={lang === "en" ? "your@email.com" : "email@example.com"}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Notes (Optional) */}
                                <div>
                                    <label className="block text-brown font-semibold mb-2">
                                        {lang === "en" ? "Order Notes (Optional)" : "ملاحظات الطلب (اختياري)"}
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                        placeholder={lang === "en" ? "Any special requests..." : "أي طلبات خاصة..."}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-brown text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-xl disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? (lang === "en" ? "Processing..." : "جاري المعالجة...")
                                    : (lang === "en" ? "Complete Order via WhatsApp" : "إتمام الطلب عبر واتساب")}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-brown mb-6">
                                {lang === "en" ? "Order Summary" : "ملخص الطلب"}
                            </h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-brown text-sm">
                                                {lang === "en" ? item.name_en : item.name_ar || item.name_en}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {lang === "en" ? "Quantity" : "الكمية"}: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gold">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t-2 border-brown pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-brown">
                                        {lang === "en" ? "Total" : "المجموع الكلي"}
                                    </span>
                                    <span className="text-2xl font-bold text-gold">
                                        {formatPrice(getCartTotal())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
