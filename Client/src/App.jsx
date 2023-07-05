// import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DetailPropertyPage from "./Components/Views/DetailProperty/DetailPropertyPage";
import HomePage from './Components/Views/Home/HomePage';
import PropertyForm from './Components/Views/PropertyForm/PropertyForm';
import { useLocation } from 'react-router-dom';
import NavBar from './Components/Inc/NavBar/NavBar';
import Footer from './Components/Inc/Footer/Footer';

const App = () => {
  const location = useLocation();


  return (
    <div className="app">
      {location.pathname !== '/' && <NavBar/>}
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/rooms/:id' element={<DetailPropertyPage/>}/>
          <Route path='/become-a-host' element={<PropertyForm/>}/>
        </Routes>
        {location.pathname !== '/' && <Footer/>} 
    </div>
  );
};

export default App;
