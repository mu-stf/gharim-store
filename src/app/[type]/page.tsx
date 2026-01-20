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

export default function SectionPage({
    params,
}: {
    params: { type: string };
}) {
    const { lang } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const { data } = await supabase
                .from("products")
                .select("*")
                .eq("section", params.type);

            setProducts(data || []);
            setLoading(false);
        }
        fetchProducts();
    }, [params.type]);

    const sectionNames: Record<string, { en: string; ar: string }> = {
        coffee: { en: "Coffee", ar: "قهوة" },
        sweets: { en: "Sweets", ar: "حلويات" },
        gifts: { en: "Gifts", ar: "هدايا" },
        traditional: { en: "Traditional Items", ar: "منتجات تقليدية" },
        books: { en: "Islamic Books", ar: "كتب إسلامية" },
    };

    const sectionName = sectionNames[params.type] || { en: params.type, ar: params.type };

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-brown mb-8 text-center"
                >
                    {lang === "en" ? sectionName.en : sectionName.ar}
                </motion.h1>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brown"></div>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-brown">
                            {lang === "en" ? "No products found" : "لا توجد منتجات"}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
