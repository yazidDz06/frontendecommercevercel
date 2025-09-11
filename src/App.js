
import './App.css';
import {BrowserRouter , Route, Routes} from 'react-router-dom';
import Accueil from './pages/Client/accueil';
import ProductAdmin from './pages/Admin/Products';
import Produits from './pages/Client/ProductList';
import AuthPage from './pages/Client/Login';
import CategoryAdmin from './pages/Admin/Categories';
import Cart from './pages/Client/Cart';
import ProductDetail from './composants/ProductCard';
import { useAuthStore } from './context/AuthStore';
import { useEffect } from 'react';
import PaymentForm from './pages/Client/OrderForum';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from './pages/Client/Mescommandes';
import AdminOrders from './pages/Admin/Orders';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminUsers from './pages/Admin/allUsers';
import AdminDashboard from './pages/Admin/Dashboard';
function App() {
 
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // remplit le store depuis le cookie si l'utilisateur est déjà logué
  }, [fetchUser]);
  return (
  
     <BrowserRouter>
    
    <Routes>
       
      <Route path="/" element={<Accueil />} />
     
      <Route path="/login" element={<AuthPage />} />
          <Route path="/adminProducts" element={<ProductAdmin />} />
          <Route path="/Products" element={<Produits />} />
          <Route path="/adminCategories" element={<CategoryAdmin />} />
          <Route path="/Panier" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/paiementsForum" element={<PaymentForm/>} />
          <Route path="/mescommandes" element={<MyOrders/>} />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminUsers" element={<AdminUsers />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
    </Routes>
    <ToastContainer position="top-center" autoClose={3000} />
     </BrowserRouter>
    
  );
}

export default App;
