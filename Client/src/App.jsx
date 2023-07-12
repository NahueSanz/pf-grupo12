import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DetailPropertyPage from "./Components/Views/DetailProperty/DetailPropertyPage";
import HomePage from "./Components/Views/Home/HomePage";
import PropertyForm from "./Components/Views/PropertyForm/PropertyForm";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/Inc/NavBar/NavBar";
import Footer from "./Components/Inc/Footer/Footer";
import Landing from "./Components/Views/Landing/Landing";

import firebaseApp from './fb'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Variable de estado para controlar si el usuario ha iniciado sesión

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth,async (usuarioFirebase) => {
      if (usuarioFirebase) {
        const token = await usuarioFirebase.getIdToken(); // Obtener el token de autenticación
        console.log("Token de autenticación:", token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log(decodedToken)
        setUsuarioGlobal(usuarioFirebase);
        // console.log("sesion iniciada");
        if (!loggedIn) { // Redirigir solo si el usuario no ha iniciado sesión antes
          setLoggedIn(true);
          navigate("/home"); // Redirigir al usuario a /home
        }
      } else {
        setUsuarioGlobal(null);
        if (loggedIn) { // Redirigir solo si el usuario ha iniciado sesión antes
          setLoggedIn(false);
          navigate("/"); // Redirigir al usuario a la página de inicio
        }
      }
    });
    // console.log(usuarioGlobal)

    return () => unsubscribe();
  }, [loggedIn, navigate]);

  return (
    <div className="app">
      {usuarioGlobal ? (
        <>
          {location.pathname !== "/" && <NavBar />}
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/rooms/:id" element={<DetailPropertyPage />} />
            <Route path="/become-a-host" element={<PropertyForm />} />
          </Routes>
          {location.pathname !== "/" && <Footer />}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
