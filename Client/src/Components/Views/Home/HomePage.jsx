// import React from "react";
import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
import Navbar from "../../Inc/NavBar/NavBar";

import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
import Footer from "../../Inc/Footer/Footer";


function HomePage () {
    return(
        <Container className={style.container}>
             <ListingGrid />
        </Container>
    )
}


export default HomePage;