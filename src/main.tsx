import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { FavouritesProvider } from "./pages/FavouritesContext";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <RouterProvider router={router} />
      </FavouritesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
