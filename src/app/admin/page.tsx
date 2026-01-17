"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function AdminPage() {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    interface ProductData {
        name_en: string;
        name_ar: string;
        description_en: string;
        description_ar: string;
        price: number;
        section: string;
    }

    async function uploadProduct(data: ProductData, file: File) {
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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const file = formData.get("image") as File;

            if (!file || file.size === 0) {
                throw new Error("Please select an image");
            }

            const productData: ProductData = {
                name_en: formData.get("name_en") as string,
                name_ar: formData.get("name_ar") as string,
                description_en: formData.get("description_en") as string,
                description_ar: formData.get("description_ar") as string,
                price: parseFloat(formData.get("price") as string),
                section: formData.get("section") as string,
            };

            await uploadProduct(productData, file);

            setMessage("✅ Product uploaded successfully!");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            setMessage(`❌ Error: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Admin - Upload Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 font-semibold">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Name (English)</label>
                        <input
                            type="text"
                            name="name_en"
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Name (Arabic)</label>
                        <input
                            type="text"
                            name="name_ar"
                            dir="rtl"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Description (English)</label>
                        <textarea
                            name="description_en"
                            rows={3}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Description (Arabic)</label>
                        <textarea
                            name="description_ar"
                            dir="rtl"
                            rows={3}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Price (USD)</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Section</label>
                        <select
                            name="section"
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Section</option>
                            <option value="coffee">Coffee</option>
                            <option value="sweets">Sweets</option>
                            <option value="gifts">Gifts</option>
                            <option value="traditional">Traditional Items</option>
                            <option value="books">Islamic Books</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-brown text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "Upload Product"}
                </button>

                {message && (
                    <div className="p-4 rounded-lg bg-gray-100 text-center">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
