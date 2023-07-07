import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
// import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
// import Footer from "../../Inc/Footer/Footer";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { getProperties } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function HomePage() {

    const dispatch = useDispatch();
    //Obtengo todas las propiedades
    const {properties} = useSelector(state => state);

    useEffect(()=>{
        dispatch(getProperties());
    },[]);
    return (
        <Container className={style.container}>
            <FilterPanel />

            <div className={style.cards}>
            {properties.map((element) => {
                return (
                    <Card 
                        key={element.id}
                        id={element.id}
                        image={element.image}
                        country={element.country}
                        description={element.description}
                        startDate={element.startDate}
                        endDate={element.endDate}
                        price={element.price}
                    />
                )
            })}

            </div>

        </Container>
    )
}


export default HomePage;