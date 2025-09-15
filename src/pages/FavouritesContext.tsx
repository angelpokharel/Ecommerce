import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types";

type FavouritesContextType = {
    favourites: Product[];
    toggleFavourite: (product: Product) => void;
    isFavourite: (id: string) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
    const [favourites, setFavourites] = useState<Product[]>([]);

    const toggleFavourite = (product: Product) => {
        setFavourites((prev) =>
            prev.some((p) => p.id === product.id)
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product]
        );
    };

    const isFavourite = (id: string) => favourites.some((p) => p.id === id);

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export function useFavourites() {
    const context = useContext(FavouritesContext);
    if (!context) throw new Error("Error");
    return context;
}
