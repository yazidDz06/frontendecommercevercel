import { useState, useEffect } from "react";

import useCartStore from "../../context/cartStore";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Footer from "../../composants/Footer";
import Navbar from "../../composants/Navbar";

export default function Produits() {
  const [listeProd, setListeProd] = useState([]);
  const [listeCat, setListeCat] = useState([]);
  const { addToCart } = useCartStore();
  const [hasSearched, setHasSearched] = useState(false);  
const [results, setResults] = useState([]);

  // Fetch produits
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setListeProd(data))
      .catch((err) => console.error("Erreur fetch produits:", err));
  }, []);

  // Fetch catégories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setListeCat(data))
      .catch((err) => console.error("Erreur fetch catégories:", err));
  }, []);

 

    const handleSearch = (searchTerm) => {
      
    if (!searchTerm) {
      setResults([]);
       setHasSearched(false);
    } else {
      const filtered = listeProd.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setHasSearched(true); 
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
  <header>
    <Navbar  onSearch={handleSearch}/> 
  </header>

      {/* Contenu principal */}
<main className="flex-1 max-w-7xl px-3 sm:px-6 md:px-8 py-4 md:py-6 mx-auto w-full">
  {hasSearched ? (
    // 🔎 Résultats de recherche
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Résultats de recherche :</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {results.map((product) => (
            <div key={product.id} className="flex flex-col">
              <Link
                to={`/products/${product.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
              >
                {product.imageUrl && (
                  <div className="h-40 sm:h-48 w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow p-3 sm:p-4 text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{product.price} $</p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id, 1);
                  toast.success(`${product.name} ajouté au panier !`);
                }}
                className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white rounded-lg 
                           bg-green-500 hover:bg-green-400 transition-all"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun produit trouvé.</p>
      )}
    </div>
  ) : (
    // 🛒 Affichage normal par catégories
    <>
      {listeCat.map((cat) => (
        <div key={cat.id} className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{cat.name}</h2>

          {/* Mobile = scroll horizontal / Desktop = grille */}
          <div className="flex md:grid gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide 
                          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {listeProd
              .filter((prod) => prod.categoryId === cat.id)
              .map((product) => (
                <div key={product.id} className="min-w-[220px] md:min-w-0 flex flex-col">
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
                  >
                    {product.imageUrl && (
                      <div className="h-40 sm:h-48 w-full overflow-hidden rounded-t-2xl">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-grow p-3 sm:p-4 text-center">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{product.price} $</p>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      toast.success(`${product.name} ajouté au panier !`);
                    }}
                    className="mt-2 w-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white rounded-lg 
                               bg-green-500 hover:bg-green-400 transition-all"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  )}
</main>



      {/* Footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}
