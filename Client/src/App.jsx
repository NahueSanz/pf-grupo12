// import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DetailPropertyPage from "./Components/Views/DetailProperty/DetailPropertyPage";
import HomePage from './Components/Views/Home/HomePage';

const App = () => {
  return (
    <div className="app">
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/rooms/:id' element={<DetailPropertyPage/>}/>
        </Routes>
    </div>
  );
};

export default App;
