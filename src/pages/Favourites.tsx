import { Link } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";
import type { Product } from "../types";

export default function Favourites() {
    const { favourites } = useFavourites();

    if (favourites.length === 0) {
        return <p className="text-center text-gray-600 mt-10">No favourites yet</p>;
    }

    return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {favourites.map((product: Product) => (
                <div
                    key={product.id}
                    className="bg-white h-60 rounded-2xl shadow-md p-6 flex flex-col justify-between"
                >
                    <Link to={`/products/${product.id}`}>
                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
