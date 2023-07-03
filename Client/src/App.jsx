import React from "react";
import Navbar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import ListingGrid from "./components/ListingGrid/ListingGrid";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <div className="app">
      <Banner />
      <Navbar />
      <ListingGrid />
      <Footer />
    </div>
  );
};

export default App;
