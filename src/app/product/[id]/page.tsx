import { supabase } from "@/lib/supabase";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

    return (
        <div className="max-w-xl mx-auto p-8">
            <img src={product.image_url} alt={product.name_en} className="w-full rounded-lg" />
            <h1 className="text-3xl font-bold mt-4">{product.name_en}</h1>
            <p className="text-gray-600 mt-2">{product.description_en}</p>
            <strong className="text-2xl text-gold block mt-4">${product.price}</strong>

            <div className="flex gap-4 mt-6">
                <a
                    href="tel:+964000000000"
                    className="bg-brown text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    📞 Call
                </a>
                <a
                    href={`https://wa.me/964000000000?text=I want ${product.name_en}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    💬 WhatsApp
                </a>
            </div>
        </div>
    );
}
