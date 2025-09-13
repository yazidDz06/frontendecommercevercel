import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCartStore from "../context/cartStore";
import { toast } from "react-hot-toast";
import Footer from "./Footer";


export default function ProductDetail() {
 
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://ecomm-o9t0.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log("Erreur récupération produit", err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">Chargement du produit...</p>
      </div>
    );
  }

  return (
   <div className="flex flex-col min-h-screen bg-gray-50">
 
  <main className="flex justify-center flex-1 py-2 px-4">
    <div className="flex flex-col w-full lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden max-w-6xl">
      
      
      <div className="flex justify-start items-start lg:w-1/2 bg-white p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full max-h-[500px] object-contain"
        />
      </div>

      {/* Infos produit */}
      <div className="lg:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-xl mb-6">{product.description}</p>
          <p className="text-2xl lg:text-3xl font-extrabold mb-6">{product.price} $</p>
        </div>

        {/* Bouton Ajouter au panier */}
        <button
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} ajouté au panier !`);
            navigate('/Panier');
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md w-full lg:w-2/3"
        >
          Ajouter au panier
        </button>
      </div>

    </div>
  </main>

  {/* Footer */}
  <footer className="w-full ">
    <Footer />
  </footer>
  </div>



  );
}


