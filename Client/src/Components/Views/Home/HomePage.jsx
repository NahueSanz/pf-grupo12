import style from "./HomePage.module.css"
import Container from 'react-bootstrap/Container';
// import ListingGrid from "../../Inc/ListingGrid/ListingGrid";
// import Footer from "../../Inc/Footer/Footer";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { getProperties } from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination } from 'react-bootstrap';


function HomePage() {

    const dispatch = useDispatch();
    //Obtengo todas las propiedades
    const {properties} = useSelector(state => state);

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

    const isLastPage = indexOfLastItem === properties.length;
    const hasNextPage = currentItems.length >= itemsPerPage;

    const firstPage = () => {
        setCurrentPage(1)
    };

    const nextPage = () => {
        setCurrentPage(currentPage+1)
    };
      
    const prevPage = () => {
        setCurrentPage(currentPage-1)
    };


    useEffect(()=>{
        dispatch(getProperties());
        setCurrentPage(1)
    },[]);


    return (
        <Container className={style.container}>
            <FilterPanel className={style.filters}/>

            <div className={style.cards}>
            {currentItems.map((element) => {
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


            <Pagination className={style.paginado}>
                <Pagination.First onClick={firstPage} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}/>
                <Pagination.Item>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={nextPage} disabled={!hasNextPage || isLastPage}/>
            </Pagination>
           
        
        </Container>
    )
}


export default HomePage;