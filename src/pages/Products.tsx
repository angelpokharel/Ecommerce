import { Link } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";
import { useProducts } from "../Hooks/useProducts";

export default function Products() {
    const { toggleFavourite, isFavourite } = useFavourites();
    const { data, isLoading, error } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {data?.map((product) => (
                <div
                    key={product.id}
                    className="relative bg-white rounded-2xl shadow-md h-64 p-4 overflow-hidden"
                >

                    <Link to={`/products/${product.id}`} className="absolute inset-0 z-0">
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
                        className={`absolute bottom-2 right-2 w-8 h-8 flex items-center 
                            justify-center border rounded-sm text-sm font-medium transition-colors z-20 ${isFavourite(product.id)
                                ? "bg-red-500 border-red-500 text-white"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {isFavourite(product.id) ? "♥" : "♡"}
                    </button>
                </div>
            ))}
        </div>
    );
}
