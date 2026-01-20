"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name_en: string;
    name_ar: string;
    price: number;
    image_url: string;
    section: string;
}

export default function ProductCard({
    id,
    name_en,
    name_ar,
    price,
    image_url,
    section,
}: ProductCardProps) {
    const { addToCart } = useCart();
    const { lang } = useLanguage();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ar-IQ", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ id, name_en, name_ar, price, image_url, section });
    };

    return (
        <Link href={`/product/${id}`}>
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
            >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                        src={image_url}
                        alt={lang === "en" ? name_en : name_ar || name_en}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="text-lg font-bold text-brown mb-2 line-clamp-2 min-h-[3.5rem]">
                        {lang === "en" ? name_en : name_ar || name_en}
                    </h3>

                    {/* Price Box */}
                    <div className="bg-beige rounded-lg px-4 py-2 mb-4 text-center">
                        <p className="text-xl font-bold text-gold">
                            {formatPrice(price)}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-brown text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg"
                    >
                        {lang === "en" ? "Add to Cart" : "إضافة للعلاگه"}
                    </button>
                </div>
            </motion.div>
        </Link>
    );
}
