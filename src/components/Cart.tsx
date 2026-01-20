"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const { lang } = useLanguage();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ar-IQ", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-6xl">🛒</div>
                <h2 className="text-2xl font-bold text-brown">
                    {lang === "en" ? "Your cart is empty" : "العلاگه فارغة"}
                </h2>
                <p className="text-gray-600">
                    {lang === "en"
                        ? "Start adding some amazing products!"
                        : "ابدأ بإضافة بعض المنتجات الرائعة!"}
                </p>
                <Link
                    href="/products"
                    className="mt-4 px-6 py-3 bg-brown text-white rounded-lg hover:opacity-90 transition"
                >
                    {lang === "en" ? "Browse Products" : "تصفح المنتجات"}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-brown">
                {lang === "en" ? "Shopping Cart" : "العلاگه"}
            </h1>

            <div className="space-y-4">
                <AnimatePresence>
                    {cart.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center"
                        >
                            {/* Product Image */}
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <Image
                                    src={item.image_url}
                                    alt={lang === "en" ? item.name_en : item.name_ar || item.name_en}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-grow text-center md:text-right">
                                <h3 className="text-lg font-bold text-brown">
                                    {lang === "en" ? item.name_en : item.name_ar || item.name_en}
                                </h3>
                                <p className="text-gold font-semibold mt-1">
                                    {formatPrice(item.price)}
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center font-bold"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-semibold text-lg">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center font-bold"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-center md:text-left w-32">
                                <p className="text-sm text-gray-600">
                                    {lang === "en" ? "Subtotal" : "المجموع الفرعي"}
                                </p>
                                <p className="text-lg font-bold text-brown">
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition p-2"
                                aria-label="Remove item"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Cart Summary */}
            <div className="mt-8 bg-beige rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-brown">
                        {lang === "en" ? "Total" : "المجموع الكلي"}
                    </span>
                    <span className="text-2xl font-bold text-gold">
                        {formatPrice(getCartTotal())}
                    </span>
                </div>

                <Link
                    href="/checkout"
                    className="block w-full bg-brown text-white text-center py-4 rounded-lg font-bold text-lg hover:opacity-90 transition"
                >
                    {lang === "en" ? "Proceed to Checkout" : "إتمام الطلب"}
                </Link>

                <Link
                    href="/products"
                    className="block w-full mt-3 bg-white text-brown text-center py-3 rounded-lg font-semibold border-2 border-brown hover:bg-gray-50 transition"
                >
                    {lang === "en" ? "Continue Shopping" : "متابعة التسوق"}
                </Link>
            </div>
        </div>
    );
}
