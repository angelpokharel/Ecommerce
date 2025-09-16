import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Favourites from "./pages/Favourites";
import AddProduct from "./pages/AddProduct";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Products /> },
            { path: "products", element: <Products /> },
            { path: "products/:id", element: <ProductDetail /> },
            { path: "favourites", element: <Favourites /> },
            { path: "add-product", element: <AddProduct /> },
        ],
    },
]);
