import axios from "axios";

export const GET_PROPERTIES = "GET_PROPERTIES";
export const GET_PROPERTY_DETAIL = "GET_PROPERTY_DETAIL";
export const GET_PROPERTIES_BY_NAME = "GET_PROPERTIES_BY_NAME";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const ORDER_PRICE = "ORDER_PRICE";
export const FIRST_PAGE = "FIRST_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";

const url = `http://localhost:3001`; //URL GENERAL

export function getProperties() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/properties`); //All properties
      return dispatch({
        type: GET_PROPERTIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getPropertyDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/property/detail/${id}`); //One property
      console.log(res.data);
      return dispatch({
        type: GET_PROPERTY_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPropertiesByName(searchName) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/countries/name?name=${searchName}`); //Property by name
      return dispatch({
        type: GET_PROPERTIES_BY_NAME,
        searchName: searchName,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function applyFilters(filterByPriceMin,  filterByPriceMax, FilterByCountry,filterByTypes) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: APPLY_FILTERS,
        payload: {filterByPriceMin:filterByPriceMin,  filterByPriceMax:filterByPriceMax, FilterByCountry:FilterByCountry,filterByTypes:filterByTypes},
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const orderPrice = (order) => {
  return { type: ORDER_PRICE, payload: order }
}

export function firstPage() {
  return {
    type: FIRST_PAGE,
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}