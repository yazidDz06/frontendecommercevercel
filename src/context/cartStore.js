import { create } from "zustand";

const API_URL = "http://localhost:5000/api/cart";

const useCartStore = create((set) => ({
  cart: null, 

  //  Charger le panier depuis le backend
  fetchCart: async () => {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include", // JWT cookie
      });

      if (!res.ok) throw new Error("Erreur fetchCart");
      const data = await res.json();
      set({ cart: data || { items: [] } }); // stocke le panier complet
    } catch (err) {
      console.error("Erreur fetchCart:", err);
      set({ cart: { items: [] } });
    }
  },

  // 🔹 Ajouter un produit au panier
  addToCart: async (product, quantity = 1) => {
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product: { id: product.id }, quantity }),
      });

      if (!res.ok) throw new Error("Erreur addToCart");
      await useCartStore.getState().fetchCart();
    } catch (err) {
      console.error("Erreur addToCart:", err);
    }
  },

  //  Modifier la quantité d’un produit
  updateQuantity: async (productId, quantity) => {
    try {
      const res = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Erreur updateQuantity");
      await useCartStore.getState().fetchCart();
    } catch (err) {
      console.error("Erreur updateQuantity:", err);
    }
  },

  //  Supprimer un produit du panier
  removeFromCart: async (productId) => {
    try {
      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erreur removeFromCart");
      await useCartStore.getState().fetchCart();
    } catch (err) {
      console.error("Erreur removeFromCart:", err);
    }
  },

  //  Vider complètement le panier
  clearCart: async () => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erreur clearCart");
      set({ cart: { items: [] } });
    } catch (err) {
      console.error("Erreur clearCart:", err);
    }
  },
}));

export default useCartStore;

