import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error, "Erreur récupération des commandes"));
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-green-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow bg-green-50"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Order{order.id}
            </h2>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between p-2 bg-white rounded-md border border-green-200"
                >
                  <span className="font-medium text-green-700">
                    {item.product.name}
                  </span>
                  <span className="text-green-600">{item.quantity}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-green-800 font-bold">
              Total : ${order.total}
            </p>
             <p className="mt-4 text-green-800 font-bold">
              statut : {order.statutCom}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
