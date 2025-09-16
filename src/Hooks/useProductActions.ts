import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types";
import { useFavourites } from "../pages/FavouritesContext";

export function useProductActions() {
    const queryClient = useQueryClient();
    const { toggleFavourite, isFavourite } = useFavourites();
    const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

    const deleteMutation = useMutation<string, Error, string>({
        mutationFn: async (id: string) => {
            const res = await fetch(`https://api.restful-api.dev/objects/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Delete failed");
            return id;
        },
        onSuccess: (deletedId: string) => {
            queryClient.setQueryData<Product[] | undefined>(["products"], (old) =>
                old ? old.filter((p) => p.id !== deletedId) : []
            );
            setRemovedIds((prev) => new Set(prev).add(deletedId));
        },
    });

    const addMutation = useMutation<Product, Error, Omit<Product, "id">>({
        mutationFn: async (newProduct) => {
            const res = await fetch("https://api.restful-api.dev/objects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });
            if (!res.ok) throw new Error("Failed to add product");
            return res.json();
        },
        onSuccess: (addedProduct) => {
            queryClient.setQueryData<Product[] | undefined>(["products"], (old) =>
                old ? [...old, addedProduct] : [addedProduct]
            );
        },
    });

    const handleRemove = (id: string) => {
        setRemovedIds((prev) => new Set(prev).add(id));
        deleteMutation.mutate(id);
    };

    const handleAdd = (newProduct: Omit<Product, "id">) => {
        addMutation.mutate(newProduct);
    };

    return {
        toggleFavourite,
        isFavourite,
        deleteMutation,
        handleRemove,
        removedIds,
        addMutation,
        handleAdd,
    };
}
