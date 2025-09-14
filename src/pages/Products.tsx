import { useQuery } from "@tanstack/react-query";

type Product = {
    id: string;
    name: string;
    data?: Record<string, any>;
};

export default function Products() {
    const { data, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("https://api.restful-api.dev/objects");
            if (!res.ok) throw new Error("Error");
            return res.json();
        },
    });

    if (isLoading) return <p>Loading..</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                >
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                    {product.data && (
                        <div className="mt-2 text-sm text-gray-700">
                            {Object.entries(product.data).map(([k, v]) => (
                                <p key={k}>
                                    <span className="font-medium">{k}:</span> {String(v)}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
