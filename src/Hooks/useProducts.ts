import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("https://api.restful-api.dev/objects");
            if (!res.ok) {

                const errorText = await res.text();
                throw new Error(`Failed to fetch products: ${errorText}`);
            }
            const data = await res.json();

            return data;
        },

    });
};
