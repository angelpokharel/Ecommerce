import { Link } from "react-router-dom";
import { useProducts } from "../Hooks/useProducts";
import { useProductActions } from "../Hooks/useProductActions";

export default function Products() {
    const { data, isLoading, error } = useProducts();
    const { toggleFavourite, isFavourite, handleRemove, removedIds } =
        useProductActions();

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {data
                ?.filter((p) => !removedIds.has(p.id))
                .map((product) => (
                    <div
                        key={product.id}
                        className="relative bg-white rounded-2xl shadow-md h-64 p-4 overflow-hidden"
                    >
                        <Link to={`/products/${product.id}`} className="block h-full">
                            <div className="flex flex-col h-full p-2 space-y-0">
                                <p className="font-bold">{product.name}</p>
                                <p className="text-sm text-gray-500">ID: {product.id}</p>
                                {product.data &&
                                    Object.entries(product.data).map(([key, value]) => (
                                        <p key={key} className="text-sm text-gray-700">
                                            {key}: {value}
                                        </p>
                                    ))}
                            </div>
                        </Link>

                        <button
                            onClick={() => toggleFavourite(product)}
                            className={`absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center border
                                 rounded-sm text-sm font-medium transition-colors ${isFavourite(product.id)
                                    ? "bg-pink-500 border-pink-500 text-white"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-pink-300"
                                }`}
                        >
                            {isFavourite(product.id) ? "♥" : "♡"}
                        </button>

                        <button
                            onClick={() => handleRemove(product.id)}

                            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border
                             border-gray-300 rounded-sm text-xs hover:bg-red-500 bg-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}
        </div>
    );
}
