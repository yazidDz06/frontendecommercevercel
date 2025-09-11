import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/AuthStore"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false); // false = login visible
  const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
 const fetchUser = useAuthStore(state => state.fetchUser); 
 const navigate = useNavigate();
  
  // Handle input changes
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";
    const dataToSend = isSignUp ? signUpData : loginData;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
       if (response.ok) {
         await fetchUser();
        setMessage(isSignUp ? "Inscription réussie 🎉" : "Connexion réussie ✅");
       
       navigate("/products");
        setTimeout(() => {
    setMessage("");
  }, 2000);
      } else {
        setMessage(data.error || "Une erreur est survenue ❌");
        setTimeout(() => {
    setMessage("");
  }, 2000);
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  return (
    
    <div className="flex w-full h-screen bg-gray-100 items-center justify-center">
       {message && (
        <div className="absolute top-4 bg-gradient-to-b from-violet-800 to-pink-200 text-white px-6 py-3 rounded shadow-lg">
          {message}
        </div>
      )}
      <div className="relative w-full max-w-5xl h-[600px] flex shadow-xl rounded-lg overflow-hidden bg-white">

        {/* Sign Up Form - gauche */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 w-1/2 h-full p-10 flex flex-col justify-center transition-transform duration-700 ease-in-out
            ${isSignUp ? "translate-x-0 opacity-100 z-10" : "-translate-x-full opacity-0 z-0 pointer-events-none"}`}
        >
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>

          <input
            type="text"
            name="username"
            placeholder="Name"
            value={signUpData.username}
            className="p-2 mb-3 border rounded"
            onChange={handleSignUpChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            className="p-2 mb-3 border rounded"
            onChange={handleSignUpChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpData.password}
            className="p-2 mb-3 border rounded"
            onChange={handleSignUpChange}
          />
          <button className="mt-4 bg-green-500 text-white py-2 rounded" type="submit">Sign Up</button>
        </form>

        {/* Sign In Form - droite */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 right-0 w-1/2 h-full p-10 flex flex-col justify-center transition-transform duration-700 ease-in-out
            ${isSignUp ? "translate-x-full opacity-0 z-0 pointer-events-none" : "translate-x-0 opacity-100 z-10"}`}
        >
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            className="p-2 mb-3 border rounded"
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            className="p-2 mb-3 border rounded"
            onChange={handleLoginChange}
          />
          <a href="#" className="text-blue-500 mb-4">Forgot your password?</a>
          <button className="mt-4 bg-blue-500 text-white py-2 rounded" type="submit" >Sign In</button>
        </form>

        {/* Overlay - toggle */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out flex flex-col justify-center items-center text-white p-10
            ${isSignUp ? "left-1/2 bg-gradient-to-l from-purple-500 to-pink-500" : "right-1/2 bg-gradient-to-r from-purple-500 to-pink-500"} cursor-pointer`}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? (
            <>
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-6 text-center">To keep connected with us please login with your personal info</p>
              <button type="button" className="border border-white px-6 py-2 rounded hover:bg-white hover:text-purple-500 transition">Sign In</button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="mb-6 text-center">Enter your personal details and start journey with us</p>
              <button type="button" className="border border-white px-6 py-2 rounded hover:bg-white hover:text-pink-500 transition">Sign Up</button>
            </>
          )}
        </div>

      </div>
      
    </div>
  );
}
