import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">E-Commerce</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-500">Products</Link>
          <Link to="/favourites" className="hover:text-blue-500">Favourites</Link>
        </nav>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
