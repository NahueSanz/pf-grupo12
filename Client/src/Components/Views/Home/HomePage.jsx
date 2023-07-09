import style from "./HomePage.module.css";
import Container from "react-bootstrap/Container";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../../redux/actions";
import { Pagination } from "react-bootstrap";

function HomePage() {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

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
      setPriceMin(value);
    }
  };

  const handlePriceMaxChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value >= 0 && !isNaN(value))) {
      setPriceMax(value);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTypeChange = (selected) => {
    console.log(selected);
    setSelectedTypes(selected);
  };

  const handleApplyFilters = () => {
    if (filterByPrice.min !== "") {
      setFilterByPrice((prevFilters) => ({
        ...prevFilters,
        max: prevFilters.max !== "" ? prevFilters.max : Infinity,
      }));
    }

    dispatch(
      applyFilters({
        filterByType,
        filterByPrice,
        filterByCountry,
        orderByPrice,
        orderByScore,
      })
    );
  };

  const filteredData = useMemo(() => {
    // Aplicar los filtros a los datos
    let filteredProperties = properties;

    // Filtrar por rango de precios
    filteredProperties = filteredProperties.filter((item) => {
      return (
        (priceMin === "" || item.price >= priceMin) &&
        (priceMax === "" || item.price <= priceMax)
      );
    });

    // Filtrar por país
    if (selectedCountry !== "") {
      filteredProperties = filteredProperties.filter(
        (item) => item.country === selectedCountry
      );
    }

    // Filtrar por tipo de propiedad
    if (selectedTypes.length > 0) {
      console.log(selectedTypes);
      filteredProperties = filteredProperties.filter((item) =>
        selectedTypes.includes(item.type)
      );
    }

    return filteredProperties;
  }, [properties, priceMin, priceMax, selectedCountry, selectedTypes]);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

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
        priceMin={priceMin}
        priceMax={priceMax}
        selectedCountry={selectedCountry}
        selectedTypes={selectedTypes}
        onPriceMinChange={handlePriceMinChange}
        onPriceMaxChange={handlePriceMaxChange}
        onCountryChange={handleCountryChange}
        onTypeChange={handleTypeChange}
        onApplyFilters={handleApplyFilters}
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
