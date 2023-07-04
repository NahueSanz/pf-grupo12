import React from "react";
import { Container } from 'react-boostrap';
import Navbar from "./components/NavBar/NavBar";

import ListingGrid from "./components/ListingGrid/ListingGrid";
import Footer from "./components/Footer/Footer";


function HomePage () {
    return(
        <Container>
             <Navbar /> 
             <ListingGrid />
             <Footer />
        </Container>
    )
}


export default HomePage;