"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { motion } from "framer-motion";

export default function Header() {
    const { getCartCount } = useCart();
    const { lang } = useLanguage();
    const cartCount = getCartCount();

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12">
                            <Logo />
                        </div>
                        <span className="text-xl font-bold text-brown hidden md:block">
                            {lang === "en" ? "Gharim Store" : "غريم ستور"}
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-brown hover:text-gold transition font-semibold"
                        >
                            {lang === "en" ? "Home" : "الرئيسية"}
                        </Link>
                        <Link
                            href="/products"
                            className="text-brown hover:text-gold transition font-semibold"
                        >
                            {lang === "en" ? "Products" : "المنتجات"}
                        </Link>
                        <Link
                            href="/admin"
                            className="text-brown hover:text-gold transition font-semibold"
                        >
                            {lang === "en" ? "Admin" : "الإدارة"}
                        </Link>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <LanguageToggle />

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2 hover:bg-beige rounded-full transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-brown"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>

                                {/* Cart Count Badge */}
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
                    <Link
                        href="/"
                        className="text-brown hover:text-gold transition font-semibold text-sm"
                    >
                        {lang === "en" ? "Home" : "الرئيسية"}
                    </Link>
                    <Link
                        href="/products"
                        className="text-brown hover:text-gold transition font-semibold text-sm"
                    >
                        {lang === "en" ? "Products" : "المنتجات"}
                    </Link>
                    <Link
                        href="/admin"
                        className="text-brown hover:text-gold transition font-semibold text-sm"
                    >
                        {lang === "en" ? "Admin" : "الإدارة"}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
