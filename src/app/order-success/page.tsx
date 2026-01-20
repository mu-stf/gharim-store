"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-8xl mb-6"
                >
                    ✅
                </motion.div>

                {/* Success Message */}
                <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4">
                    {lang === "en" ? "Order Sent Successfully!" : "تم إرسال الطلب بنجاح!"}
                </h1>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {lang === "en"
                        ? "Thank you for your order! We have received your request via WhatsApp and will contact you shortly to confirm your order details."
                        : "شكراً لطلبك! لقد استلمنا طلبك عبر واتساب وسنتواصل معك قريباً لتأكيد تفاصيل طلبك."}
                </p>

                {/* Order Info */}
                <div className="bg-beige rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-brown mb-3">
                        {lang === "en" ? "What's Next?" : "ما التالي؟"}
                    </h2>
                    <ul className="text-right space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-gold">✓</span>
                            <span>
                                {lang === "en"
                                    ? "Our team will review your order"
                                    : "سيقوم فريقنا بمراجعة طلبك"}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-gold">✓</span>
                            <span>
                                {lang === "en"
                                    ? "We'll contact you to confirm delivery details"
                                    : "سنتواصل معك لتأكيد تفاصيل التوصيل"}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-gold">✓</span>
                            <span>
                                {lang === "en"
                                    ? "Your order will be prepared and shipped"
                                    : "سيتم تحضير طلبك وشحنه"}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="mb-8">
                    <p className="text-gray-600 mb-4">
                        {lang === "en"
                            ? "Need help? Contact us:"
                            : "تحتاج مساعدة؟ تواصل معنا:"}
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://wa.me/964XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <span>💬</span>
                            <span>{lang === "en" ? "WhatsApp" : "واتساب"}</span>
                        </a>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-brown text-white rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        {lang === "en" ? "Continue Shopping" : "متابعة التسوق"}
                    </Link>
                    <Link
                        href="/"
                        className="px-8 py-3 bg-white text-brown border-2 border-brown rounded-lg font-semibold hover:bg-beige transition"
                    >
                        {lang === "en" ? "Back to Home" : "العودة للرئيسية"}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
