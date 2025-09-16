import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProduct } from "../Hooks/useAddProduct";


export default function AddProduct() {
    const navigate = useNavigate();
    const addMutation = useAddProduct();

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMutation.mutate(
            { name, data: { color, price: parseFloat(price) } },
            {
                onSuccess: () => {
                    setName("");
                    setColor("");
                    setPrice("");
                    navigate("/");
                },
            }
        );
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>

            {addMutation.status === "error" && (
                <p className="text-red-500 mb-2">{(addMutation.error as Error).message}</p>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Product Name"
                    className="border rounded p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Color"
                    className="border rounded p-2"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="border rounded p-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={addMutation.status === "pending"}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {addMutation.status === "pending" ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
