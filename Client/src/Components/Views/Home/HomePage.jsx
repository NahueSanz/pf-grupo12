import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
// import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
// import Footer from "../../Inc/Footer/Footer";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";


function HomePage () {
    return(
        <Container className={style.container}>
            <FilterPanel/>
            {/* <ListingGrid /> */}
        </Container>
    )
}


export default HomePage;