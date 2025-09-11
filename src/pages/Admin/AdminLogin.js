import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login admin
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important pour cookie JWT
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Échec de connexion");

      // 2️⃣ Vérification rôle via /me
      const meRes = await fetch("http://localhost:5000/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!meRes.ok) throw new Error("Impossible de vérifier le rôle");
      const user = await meRes.json();

      if (user.role !== "admin") {
        setError("Accès refusé : vous n'êtes pas admin");
        return;
      }

      
      navigate("/adminDashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-red-500 text-center font-semibold">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
