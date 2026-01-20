"use client";

import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    price: number;
    image_url: string;
    section: string;
}

export default function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { addToCart } = useCart();
    const { lang } = useLanguage();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProduct();
    }, [params.id]);

    async function fetchProduct() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) throw error;
            setProduct(data);

            // Fetch related products from same section
            if (data) {
                const { data: related } = await supabase
                    .from("products")
                    .select("*")
                    .eq("section", data.section)
                    .neq("id", params.id)
                    .limit(3);

                setRelatedProducts(related || []);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ar-IQ", {
            style: "currency",
            currency: "IQD",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(
                {
                    id: product.id,
                    name_en: product.name_en,
                    name_ar: product.name_ar,
                    price: product.price,
                    image_url: product.image_url,
                    section: product.section,
                },
                quantity
            );
            router.push("/cart");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brown"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="text-6xl">❌</div>
                <h2 className="text-2xl font-bold text-brown">
                    {lang === "en" ? "Product not found" : "المنتج غير موجود"}
                </h2>
                <Link
                    href="/products"
                    className="px-6 py-3 bg-brown text-white rounded-lg hover:opacity-90 transition"
                >
                    {lang === "en" ? "Back to Products" : "العودة للمنتجات"}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-600">
                    <Link href="/" className="hover:text-brown transition">
                        {lang === "en" ? "Home" : "الرئيسية"}
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/products" className="hover:text-brown transition">
                        {lang === "en" ? "Products" : "المنتجات"}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-brown font-semibold">
                        {lang === "en" ? product.name_en : product.name_ar || product.name_en}
                    </span>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={product.image_url}
                            alt={lang === "en" ? product.name_en : product.name_ar || product.name_en}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="text-4xl font-bold text-brown">
                            {lang === "en" ? product.name_en : product.name_ar || product.name_en}
                        </h1>

                        <div className="bg-beige rounded-lg px-6 py-4 inline-block">
                            <p className="text-3xl font-bold text-gold">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        <div className="prose prose-lg">
                            <p className="text-gray-700 leading-relaxed">
                                {lang === "en"
                                    ? product.description_en || "No description available"
                                    : product.description_ar || product.description_en || "لا يوجد وصف"}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold text-brown">
                                {lang === "en" ? "Quantity:" : "الكمية:"}
                            </span>
                            <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center font-bold text-xl"
                                >
                                    −
                                </button>
                                <span className="w-16 text-center font-bold text-xl">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center font-bold text-xl"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-brown text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-xl"
                        >
                            {lang === "en" ? "Add to Cart" : "إضافة للعلاگه"}
                        </button>

                        <Link
                            href="/products"
                            className="text-center text-brown hover:text-gold transition font-semibold"
                        >
                            {lang === "en" ? "← Continue Shopping" : "متابعة التسوق ←"}
                        </Link>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-brown mb-8 text-center">
                            {lang === "en" ? "Related Products" : "منتجات ذات صلة"}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/product/${relatedProduct.id}`}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={relatedProduct.image_url}
                                            alt={lang === "en" ? relatedProduct.name_en : relatedProduct.name_ar || relatedProduct.name_en}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-brown mb-2">
                                            {lang === "en" ? relatedProduct.name_en : relatedProduct.name_ar || relatedProduct.name_en}
                                        </h3>
                                        <p className="text-gold font-semibold">
                                            {formatPrice(relatedProduct.price)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
