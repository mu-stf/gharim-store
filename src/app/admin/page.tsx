"use client";

import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminPage() {
    const { lang } = useLanguage();
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    async function uploadProduct(data: any, file: File) {
        const { data: upload, error: uploadError } = await supabase.storage
            .from("products")
            .upload(`images/${Date.now()}-${file.name}`, file);

        if (uploadError) throw uploadError;

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${upload.path}`;

        const { error: insertError } = await supabase.from("products").insert({
            ...data,
            image_url: imageUrl,
        });

        if (insertError) throw insertError;
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const file = formData.get("image") as File;

            if (!file || file.size === 0) {
                throw new Error(lang === "en" ? "Please select an image" : "يرجى اختيار صورة");
            }

            const productData = {
                name_en: formData.get("name_en") as string,
                name_ar: formData.get("name_ar") as string,
                description_en: formData.get("description_en") as string,
                description_ar: formData.get("description_ar") as string,
                price: parseFloat(formData.get("price") as string),
                section: formData.get("section") as string,
            };

            await uploadProduct(productData, file);

            setMessage(lang === "en" ? "✅ Product uploaded successfully!" : "✅ تم رفع المنتج بنجاح!");
            (e.target as HTMLFormElement).reset();
            setImagePreview(null);
        } catch (error: any) {
            setMessage(`❌ ${lang === "en" ? "Error" : "خطأ"}: ${error.message}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-beige to-white py-12">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-brown mb-2">
                        {lang === "en" ? "Admin Panel" : "لوحة الإدارة"}
                    </h1>
                    <p className="text-gray-600">
                        {lang === "en" ? "Upload and manage products" : "رفع وإدارة المنتجات"}
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
                >
                    {/* Image Upload with Preview */}
                    <div>
                        <label className="block mb-3 font-bold text-brown text-lg">
                            {lang === "en" ? "Product Image" : "صورة المنتج"} *
                        </label>

                        {imagePreview && (
                            <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            onChange={handleImageChange}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brown file:text-white file:cursor-pointer hover:file:opacity-90"
                        />
                    </div>

                    {/* Product Names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Name (English)" : "الاسم (إنجليزي)"} *
                            </label>
                            <input
                                type="text"
                                name="name_en"
                                required
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                placeholder="Product name in English"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Name (Arabic)" : "الاسم (عربي)"}
                            </label>
                            <input
                                type="text"
                                name="name_ar"
                                dir="rtl"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                placeholder="اسم المنتج بالعربي"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Description (English)" : "الوصف (إنجليزي)"}
                            </label>
                            <textarea
                                name="description_en"
                                rows={4}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                placeholder="Product description in English"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Description (Arabic)" : "الوصف (عربي)"}
                            </label>
                            <textarea
                                name="description_ar"
                                dir="rtl"
                                rows={4}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                placeholder="وصف المنتج بالعربي"
                            />
                        </div>
                    </div>

                    {/* Price and Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Price (IQD)" : "السعر (دينار عراقي)"} *
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="1"
                                required
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                                placeholder="25000"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-brown">
                                {lang === "en" ? "Section" : "القسم"} *
                            </label>
                            <select
                                name="section"
                                required
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brown transition"
                            >
                                <option value="">
                                    {lang === "en" ? "Select Section" : "اختر القسم"}
                                </option>
                                <option value="coffee">{lang === "en" ? "Coffee" : "قهوة"}</option>
                                <option value="sweets">{lang === "en" ? "Sweets" : "حلويات"}</option>
                                <option value="gifts">{lang === "en" ? "Gifts" : "هدايا"}</option>
                                <option value="traditional">{lang === "en" ? "Traditional Items" : "منتجات تقليدية"}</option>
                                <option value="books">{lang === "en" ? "Islamic Books" : "كتب إسلامية"}</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-brown text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading
                            ? (lang === "en" ? "Uploading..." : "جاري الرفع...")
                            : (lang === "en" ? "Upload Product" : "رفع المنتج")}
                    </button>

                    {/* Message Display */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg text-center font-semibold ${message.includes("✅")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {message}
                        </motion.div>
                    )}
                </motion.form>
            </div>
        </div>
    );
}
