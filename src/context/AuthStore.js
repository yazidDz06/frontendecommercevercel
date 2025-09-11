import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

fetchUser: async () => {
  try {
    const res = await fetch("https://ecomm-o9t0.onrender.com/api/me", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      set({ user: data });
    } else if (res.status === 401) {
      // pas connecté → on ignore
      set({ user: null });
    } else {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
  } catch {
    set({ user: null });
  }
},

  logout: async () => {
    await fetch("https://ecomm-o9t0.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
    });
    set({ user: null });
  },
}));
