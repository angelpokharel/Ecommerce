import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await fetch(`https://api.restful-api.dev/objects/${id}`);
            if (!res.ok) throw new Error("Failed, try again");
            return res.json();
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p className="text-gray-500">ID: {data?.id}</p>

            {data?.data && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Details</h2>
                    <div className="space-y-2">
                        {Object.entries(data.data).map(([key, value]) => (
                            <p key={key} className="text-gray-700">
                                <span className="font-semibold capitalize">{key}:</span> {value}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
