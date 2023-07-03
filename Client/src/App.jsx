import React from "react";
import Navbar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import ListingGrid from "./components/ListingGrid/ListingGrid";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Banner />
      <Navbar />
      <Routes>
        <Route element={<ListingGrid />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
