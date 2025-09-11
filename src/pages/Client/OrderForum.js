import useCartStore from "../../context/cartStore";
import { useEffect, useState } from "react";
import { calculateTotal } from "./Cart";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentForm() {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  const [formData, setFormData] = useState({ city: "",street: ""});
  const items = cart?.items || [];
  const Total = calculateTotal(items);
  const delivery = 5;
  const finalTotal = Total + delivery;
  
 const handleChange = (e) =>{
  const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,[name]: value
    }));
   
 }
  const  handleSubmit = async (e) => {
    e.preventDefault();
      let newErrors = {};
  if (!formData.city.trim()) {
    newErrors.city = "City is required";
  }
  if (!formData.street.trim()) {
    newErrors.street = "Street is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error(" Please complete all required fields!");
    return; // stoppe l’envoi si erreur
  }
 
  //appel api pour l'envoie vers le backend
  try{
 const response = await fetch("http://localhost:5000/api/orders",{
   method :"POST",
   headers:{ "Content-Type": "application/json" },
   body: JSON.stringify({
   city : formData.city,
   street : formData.street,
   total :Number(finalTotal),
 }),
  credentials: "include",
  });
   if (!response.ok) {
      throw new Error("Erreur lors de la création de la commande");
    
    }

    const result = await response.json();
    console.log("order done",result);
    toast.success(" Commande confirmée !");
setFormData ({
  city :"",
  street:""
})

  }catch(error){
    console.error("erreur submiting order",error);
   
  }

  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="h-16 bg-green-600 flex items-center px-4 text-white font-semibold text-lg shadow-md rounded-md"
      onClick={()=>navigate("/Panier")}
      >
        <MdArrowBack size={24} className="mr-2 cursor-pointer" />
        Return to cart
      </div>

      <div className="bg-white mt-6 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-600 border-b pb-2 mb-4">
          Order details
        </h3>

        {items?.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">
                {item.product.name}
              </span>
              <span className="text-lg font-semibold text-gray-900">
                {item.product.price} $
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Quantity ({item.quantity})</span>
              <span className="font-semibold">{Total} $</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Delivery</span>
              <span className="font-semibold">{delivery} $</span>
            </div>

            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-blue-600">
                {finalTotal} $
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-6 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-600 border-b pb-2 mb-4">
          Shipping data
        </h3>
        <div className="flex flex-col gap-4">
          <input
            className={`rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
    errors.city
      ? "border border-red-500 focus:ring-red-500"
      : "bg-gray-100 focus:ring-blue-500"
  }`}
            placeholder="Your City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            className={`rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
    errors.city
      ? "border border-red-500 focus:ring-red-500"
      : "bg-gray-100 focus:ring-blue-500"
  }`}
            placeholder="Street number"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="bg-white mt-6 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-600 border-b pb-2 mb-4">
          Payment method
        </h3>
        <p className="text-center font-semibold text-lg text-gray-800">
          On delivery
        </p>
      </div>

      
      <div className="flex flex-col items-center gap-4 mt-8">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-800 transition"
        onClick={()=>navigate("/Products")}
        >
          <MdArrowBack size={20} />
          Return to purchases
        </button>

        <button 
        onClick={handleSubmit}
        className="w-64 py-3 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700 transition">
          Confirm Order
        </button>
      </div>
    </div>
  );
}
