import { useState, useEffect } from "react";

export default function AdminOrders() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/allorders", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Non autorisé ou erreur serveur");
        return res.json();
      })
      .then((data) => setCommandes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6">
        📦 Liste des commandes
      </h2>

      <div className="grid gap-6">
        {commandes.map((cmd) => (
          <div
            key={cmd.id}
            className="border border-green-200 rounded-2xl shadow-sm p-4 bg-green-50 hover:shadow-md transition"
          >
            {/* Infos de la commande */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-700">
                Commande #{cmd.id}
              </h3>
              <span className="text-sm text-green-600 font-medium">
                Statut : {cmd.statutCom}
              </span>
            </div>

            {/* Items de la commande */}
            <div className="space-y-3">
              {cmd.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between bg-white border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium text-green-800">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-green-600">
                      Quantité : {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-green-700">
                    {item.product?.price} $
                  </p>
                </div>
              ))}
            </div>

            {/* Footer commande */}
            <div className="mt-4 border-t pt-3 flex justify-between items-center">
              <p className="text-sm text-green-700">
                Client : {cmd.user?.username}
              </p>
              <p className="font-bold text-green-800">Total : {cmd.total} $</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
