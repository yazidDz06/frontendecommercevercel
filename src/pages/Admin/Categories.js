import { useState, useEffect } from "react";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  //  Récupérer les catégories depuis le backend
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      console.log(data);
      setCategories(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //  Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Ajouter ou modifier une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/api/categories/${editingId}`
        : "http://localhost:5000/api/categories";
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: formData.name }),
      });

      setFormData({ name: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  //  Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" ,  credentials: "include"});
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // Préparer l’édition
  const handleEdit = (category) => {
    setFormData({ name: category.name || "" });
    setEditingId(category.id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestion des Catégories</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-gray-100 p-4 rounded">
        <input
          type="text"
          name="name"
          placeholder="Nom de la catégorie"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      
      <div className="border rounded">
        {categories.map((c) => (
          <div key={c.id} className="flex justify-between items-center border-b p-2">
            <span className="font-bold">{c.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

