import { useEffect, useState } from "react";
import produit1 from "../../assets/back.jpg";
import produit2 from "../../assets/produit3.jpg";
import produit3 from "../../assets/montre.jpg";
import produit4 from "../../assets/Design.png";
import produit5 from "../../assets/prod5.png";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../composants/Footer";
import Navbar from "../../composants/Navbar";

const produits = [produit1, produit2, produit3, produit4, produit5];

export default function Accueil() {
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [listeProd, setListeProd] = useState([]);

  // Fetch produits
  useEffect(() => {
    fetch("https://ecomm-o9t0.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setListeProd(data))
      .catch((err) => console.error("Erreur fetch produits:", err));
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

  const navigate = useNavigate();
  const [images, setImages] = useState(produits);

  // Slider : toutes les 2 secondes on décale les images
  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
  <Navbar onSearch={handleSearch} />

  {hasSearched ? (
    // 🔎 Résultats de recherche
    <main className="px-3 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Résultats de recherche :
      </h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  <p className="text-gray-600 text-sm sm:text-base">{product.price} $</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun produit trouvé.</p>
      )}
    </main>
  ) : (
    <div className="relative w-full bg-white">
      {/* Slider */}
      <section className="relative w-full flex gap-4 sm:gap-6 px-3 sm:px-6 overflow-x-auto py-8 scrollbar-hide">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Produit ${i}`}
            className="w-40 sm:w-60 h-40 sm:h-60 object-cover rounded-3xl shadow-xl flex-shrink-0 transition-all duration-700"
          />
        ))}
      </section>

      {/* Texte d'accueil */}
      <section className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 sm:px-6 space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Let's start your shopping journey
        </h1>

        <h3 className="text-base sm:text-xl font-medium max-w-md sm:max-w-2xl">
          Our platform collects the most modern and rare accessories for men
          and women. Carefully selected to offer our customers a unique look.
        </h3>

        <button
          className="mt-4 text-white bg-black border border-gray-300 
                     hover:bg-gray-500 focus:ring-4 focus:ring-gray-200 
                     font-medium rounded-full text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3
                     transition"
          onClick={() => navigate("/products")}
        >
          Shop now
        </button>
      </section>
    </div>
  )}

  <Footer />
</div>

  );
}

