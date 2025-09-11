import { useEffect } from "react";
import useCartStore from "../../context/cartStore";
import { useNavigate} from "react-router-dom";
import Footer from "../../composants/Footer";

 export function calculateTotal(items) {
  return items.reduce(
    (acc, item) => acc + Number(item.product.price) * item.quantity,
    0
  );
}
export default function Cart() {
  // Récupération du state et des méthodes du store
  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
 const navigate = useNavigate();
  // Charger le panier au montage
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart) return <p className="text-center">Chargement...</p>;

  const items = cart.items || [];

 const total = calculateTotal(items);

  return (
    <div className="min-h-screen bg-white mt-4 ">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-600 text-center">Empty cart.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-sm"
              >
                {/* Infos produit */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600">{item.product.price} €</p>
                </div>

                {/* Contrôles quantité */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Number(e.target.value))
                    }
                    className="w-12 text-center border rounded-md"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Supprimer */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Supprimer
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-4 mt-6">
              <h3 className="text-xl font-semibold">Total :</h3>
              <p className="text-xl font-bold text-green-600">{total} $</p>
            </div>

            {/* Boutons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={clearCart}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Vider le panier
              </button>
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={()=>navigate('/paiementsForum')}
              >
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-16">
           <Footer />
      </div>
      
    </div>
    
  
  );
}

