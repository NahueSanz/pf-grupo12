import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { login, logout } from "./redux/actions";
import axios from "axios";
import FormPerfil from "./Components/Inc/FormPerfil/FormPerfil";
import FormProperty from "./Components/Inc/FormProperty/FormProperty";

import firebaseApp from "./fb";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
import Payment from "./Components/Views/Payment/Payment";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  const loggedIn = useSelector((state) => state.loggedIn);
  console.log(loggedIn);

  function generatePassword(longitud) {
    var caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    var password = "";
    for (var i = 0; i < longitud; i++) {
      var indice = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(indice);
    }
    return password;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        const token = await usuarioFirebase.getIdToken(); // Obtener el token de autenticación
        console.log("Token de autenticación:", token);
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log(decodedToken);
        const email = decodedToken.email;
        const password = generatePassword(8);

        axios
          .post(`http://localhost:3001/public/register`, { email, password })
          .then((res) => {
            console.log(res.data);
            alert("Created user");
          })
          .catch((error) => console.log(error));

        //          dispatch(login());
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [loggedIn]);

  return (
    <div className="app">
      {loggedIn ? (
        <>
          {location.pathname !== "/" && <NavBar />}
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/rooms/:id" element={<DetailPropertyPage />} />
            <Route path="/become-a-host" element={<PropertyForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Miperfilform" element={<FormPerfil />} />
            <Route path="/Create-my-prperty" element={<FormProperty />} />
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
