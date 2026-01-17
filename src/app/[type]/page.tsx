import { supabase } from "@/lib/supabase";

export default async function SectionPage({
    params,
}: {
    params: { type: string };
}) {
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("section", params.type);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            {products?.map((product) => (
                <div key={product.id} className="card">
                    <img
                        src={product.image_url}
                        alt={product.name_en}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-bold mt-4">{product.name_en}</h3>
                    <p className="text-lg text-gold mt-2">${product.price}</p>
                </div>
            ))}
        </div>
    );
}
