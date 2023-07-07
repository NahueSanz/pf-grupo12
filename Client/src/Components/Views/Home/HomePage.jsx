
import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
// import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
// import Footer from "../../Inc/Footer/Footer";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";



function HomePage() {
    return (
        <Container className={style.container}>
            <FilterPanel />

            <div className={style.cards}>
            {[1, 2, 3, 4, 5, 6, 7 ,8].map((element, index) => {
                return (
                    <Card key={index} />
                )
            })}

            </div>

        </Container>
    )
}


export default HomePage;