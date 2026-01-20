"use client";

import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

interface Product {
    id: string;
    name_en: string;
    name_ar: string;
    price: number;
    image_url: string;
    section: string;
}

export default function ProductsPage() {
    const { lang } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        { id: "all", name_en: "All Products", name_ar: "جميع المنتجات" },
        { id: "coffee", name_en: "Coffee", name_ar: "قهوة" },
        { id: "sweets", name_en: "Sweets", name_ar: "حلويات" },
        { id: "gifts", name_en: "Gifts", name_ar: "هدايا" },
        { id: "traditional", name_en: "Traditional", name_ar: "تقليدية" },
        { id: "books", name_en: "Books", name_ar: "كتب" },
    ];

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    async function fetchProducts() {
        setLoading(true);
        try {
            let query = supabase.from("products").select("*");

            if (selectedCategory !== "all") {
                query = query.eq("section", selectedCategory);
            }

            const { data, error } = await query;

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                        {lang === "en" ? "Our Products" : "منتجاتنا"}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {lang === "en"
                            ? "Discover our collection of quality products inspired by Iraqi culture"
                            : "اكتشف مجموعتنا من المنتجات عالية الجودة المستوحاة من الثقافة العراقية"}
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedCategory === category.id
                                    ? "bg-brown text-white shadow-lg scale-105"
                                    : "bg-white text-brown border-2 border-brown hover:bg-beige"
                                }`}
                        >
                            {lang === "en" ? category.name_en : category.name_ar}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brown"></div>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && products.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-brown mb-2">
                            {lang === "en" ? "No products found" : "لا توجد منتجات"}
                        </h2>
                        <p className="text-gray-600">
                            {lang === "en"
                                ? "Try selecting a different category"
                                : "جرب اختيار فئة مختلفة"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
