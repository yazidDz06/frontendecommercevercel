import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);
 const navigate=useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur ou accès interdit");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md"
      onClick={()=>navigate("/adminUsers")}>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <p className="text-3xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-xl shadow-md"
      onClick={()=>navigate("/adminProducts")}>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <p className="text-3xl font-bold">{stats.totalProducts}</p>
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-md"
      onClick={()=>navigate("/adminOrders")}>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <p className="text-3xl font-bold">{stats.totalOrders}</p>
      </div>
      <div className="bg-purple-500 text-white p-6 rounded-xl shadow-md"
      onClick={()=>navigate("/adminCategories")}>
        <h2 className="text-xl font-semibold mb-2">Catégories</h2>
        <p className="text-3xl font-bold">{stats.totalCategories}</p>
      </div>
    </div>
  );
}
