import { HelpCircleIcon, Menu, ShoppingCart, User, X } from "lucide-react";
import { useAuthStore } from "../context/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ onSearch }) {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // menu mobile
  const [menuOpen, setMenuOpen] = useState(false); // dropdown utilisateur

  // Vérifie l'utilisateur connecté au chargement
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout(); // supprime cookie + reset user
    setMenuOpen(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-gradient-to-b from-green-200 to-white shadow p-4 flex items-center justify-between relative">

      {/* Bouton menu mobile */}
      <button
        className="p-2 hover:bg-gray-100 rounded-full md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Barre de recherche */}
      <form onSubmit={handleSubmit} className="flex-1 flex justify-center items-center">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-3/5 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-200 hover:bg-white text-lg font-medium rounded-2xl ml-2 w-24 h-10"
        >
          Rechercher
        </button>
      </form>

      {/* Liens desktop */}
      <div className="hidden md:flex items-center gap-4">
        <a href="#foot" className="p-2 hover:bg-gray-100 rounded-full">
          <HelpCircleIcon size={22} />
        </a>

        {/* Dropdown utilisateur */}
        <div className="relative">
          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <User size={22} />
            {user ? (
  <span>Bienvenue, {user.username}</span>
) : (
  <span>Login</span>
)}
          </button>

          {menuOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Mon Profil
              </Link>
              <Link
                to="/mescommandes"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Mes Commandes
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              >
                Déconnexion
              </button>
            </div>
          )}

          {menuOpen && !user && (
             <Link
    to="/login"
    className="block px-4 py-2 hover:bg-gray-100 text-sm"
    onClick={() => setMenuOpen(false)}
  >
    Connexion
  </Link>
          )}
        </div>

        {/* Panier */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => navigate("/Panier")}
        >
          <ShoppingCart size={22} />
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden z-50">
          <a href="#foot" className="p-2 hover:bg-gray-100 rounded-xl flex items-center gap-2">
            <HelpCircleIcon size={22} /> Aide
          </a>

          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl">
                  <User size={22} />
                  <span>Bienvenue, {user.username}</span>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Mon Profil
                </Link>
                <Link
                  to="/mescommandes"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Mes Commandes
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>

          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl"
            onClick={() => setIsOpen(false) || navigate("/Panier")}
          >
            <ShoppingCart size={22} /> Panier
          </button>
        </div>
      )}
    </header>
  );
}


