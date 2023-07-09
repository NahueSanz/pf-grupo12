import style from "./HomePage.module.css";
import Container from "react-bootstrap/Container";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../../redux/actions";
import { Pagination } from "react-bootstrap";

function HomePage() {
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    selectedCountry: "",
    selectedTypes: [],
  });

  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProperties()).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  const handlePriceMinChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value >= 0 && !isNaN(value))) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceMin: value,
      }));
    }
  };

  const handlePriceMaxChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value >= 0 && !isNaN(value))) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        priceMax: value,
      }));
    }
  };

  const handleCountryChange = (event) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCountry: value,
    }));
  };

  const handleTypeChange = (selected) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedTypes: selected,
    }));
  };

  const filteredData = useMemo(() => {
    // Filtrar por rango de precios
    let filteredProperties = properties.filter((item) => {
      return (
        (filters.priceMin === "" || item.price >= filters.priceMin) &&
        (filters.priceMax === "" || item.price <= filters.priceMax)
      );
    });

    // Filtrar por país
    if (filters.selectedCountry !== "") {
      filteredProperties = filteredProperties.filter(
        (item) => item.country === filters.selectedCountry
      );
    }

    // Filtrar por tipo de propiedad
    if (filters.selectedTypes.length > 0) {
      filteredProperties = filteredProperties.filter((item) =>
        filters.selectedTypes.includes(item.type)
      );
    }

    return filteredProperties;
  }, [properties, filters]);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const isLastPage = indexOfLastItem === filteredData.length;
  const hasNextPage = currentItems.length >= itemsPerPage;

  const firstPage = () => {
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    dispatch(getProperties());
    setCurrentPage(1);
  }, []);

  return (
    <Container className={style.container}>
      <FilterPanel
        priceMin={filters.priceMin}
        priceMax={filters.priceMax}
        selectedCountry={filters.selectedCountry}
        selectedTypes={filters.selectedTypes}
        onPriceMinChange={handlePriceMinChange}
        onPriceMaxChange={handlePriceMaxChange}
        onCountryChange={handleCountryChange}
        onTypeChange={handleTypeChange}
      />

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
