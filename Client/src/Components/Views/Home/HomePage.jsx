import style from "./HomePage.module.css";
import Container from "react-bootstrap/Container";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions"
import { Pagination } from "react-bootstrap";

function HomePage() {
  

  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties);
  const searchTerm = useSelector((state)=>state.searchTerm)
  

  useEffect(() => {
    dispatch(actions.getProperties()).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  //Paginado

  const currentPage = useSelector((state) => state.page);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  const isLastPage = indexOfLastItem === properties.length;
  const hasNextPage = currentItems.length >= itemsPerPage;

  const firstPage = () => {
    dispatch(actions.firstPage())
  };

  const nextPage = () => {
    dispatch(actions.nextPage())
  };

  const prevPage = () => {
    dispatch(actions.prevPage())
  };

  useEffect(() => {
    dispatch(actions.getProperties());
    dispatch(actions.firstPage())
  }, []);

  return (
    <Container className={style.container}>
      <FilterPanel/>

      {searchTerm.length?
          <h4 className={style.searchTerm}>Searching properties by "{searchTerm}"</h4 >:
          <h4 className={style.searchTerm}>Showing all properties</h4 >
      }

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
          );
        })}
      </div>

      <Pagination className={style.paginado}>
        <Pagination.First onClick={firstPage} disabled={currentPage === 1} />
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={nextPage}
          disabled={!hasNextPage || isLastPage}
        />
      </Pagination>
    </Container>
  );
}

export default HomePage;
