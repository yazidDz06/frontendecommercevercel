import { useState, useEffect } from "react";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://ecomm-o9t0.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur fetch produits :", error);
    }
  };

  
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://ecomm-o9t0.onrender.com/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur fetch catégories :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  //Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Ajouter ou modifier produit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = "https://ecomm-o9t0.onrender.com/api/products";
      const url = editingId ? `${baseUrl}/${editingId}` : baseUrl;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          imageUrl: formData.imageUrl,
          categoryName: formData.category,
        }),
      });


      // ✅ Réinitialiser le formulaire
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: "",
      });
      setEditingId(null);

      //  Recharger la liste
      fetchProducts();
    } catch (error) {
      console.error(" Erreur submit produit :", error);
    }
  };

  // Supprimer produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await fetch(`https://ecomm-o9t0.onrender.com/api/products/${id}`, { method: "DELETE" ,  credentials: "include"});
      fetchProducts();
    } catch (error) {
      console.error("Erreur delete produit :", error);
    }
  };

  // ✏️ Préparer l’édition
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: product.category?.name || "",
    });
    setEditingId(product.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestion des Produits</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-gray-100 p-4 rounded">
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL de l'image"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Catégorie</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price} $</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.category?.name || "-"}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
