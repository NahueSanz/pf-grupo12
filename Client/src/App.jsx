import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ListingGrid from "./components/ListingGrid";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <Routes>
        <div className="app__content">
          <ListingGrid />
        </div>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
