import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types";

export function useAddProduct() {
    const queryClient = useQueryClient();

    const mutation = useMutation<Product, Error, Omit<Product, "id">>({
        mutationFn: async (newProduct) => {
            const res = await fetch("https://api.restful-api.dev/objects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });
            if (!res.ok) throw new Error("Failed to add");
            return res.json() as Promise<Product>;
        },
        onSuccess: (addedProduct) => {
            queryClient.setQueryData<Product[] | undefined>(["products"], (old) =>
                old ? [...old, addedProduct] : [addedProduct]
            );
        },
    });

    return mutation;
}
