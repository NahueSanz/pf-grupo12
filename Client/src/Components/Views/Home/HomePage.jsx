// import React from "react";
import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
import Navbar from "../../Inc/NavBar/NavBar";

import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
import Footer from "../../Inc/Footer/Footer";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel"


function HomePage () {
    return(
        <Container className={style.container}>
      
             <Navbar /> 
             <FilterPanel></FilterPanel>
             <ListingGrid />
             <Footer />
        </Container>
    )
}


export default HomePage;