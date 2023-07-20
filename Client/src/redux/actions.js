import axios from "axios";

export const GET_PROPERTIES = "GET_PROPERTIES";
export const GET_PROPERTY_DETAIL = "GET_PROPERTY_DETAIL";
export const GET_PROPERTIES_BY_NAME = "GET_PROPERTIES_BY_NAME";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const ORDER_PRICE = "ORDER_PRICE";
export const FIRST_PAGE = "FIRST_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const SEARCH_BY_TITLE = "SEARCH_BY_TITLE";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const urlLocal = `http://localhost:3001`; //URL GENERAL
const url = `https://pf-grupo12-production.up.railway.app/`; //URL Data-base deploy

//Trae todos los usuarios de la BDD
export function getUsers() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlLocal}/admin/users`); //All users
      return dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Trae todas las propiedades de la BDD
export function getProperties() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlLocal}/public/properties`); //All properties
      return dispatch({
        type: GET_PROPERTIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function searchPropertiesByTitle(title) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlLocal}/public/properties?title=${title}`); //Search properties by title
      return dispatch({
        type: SEARCH_BY_TITLE,
        searchName: title,
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
      const res = await axios.get(`${urlLocal}/public/property/detail/${id}`); //One property
      //console.log(res.data);
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
  //SIN USAR? QUIZA SE PUEDA BORRAR
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlLocal}/countries/name?name=${searchName}`); //Property by name
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

export function applyFilters(
  filterByPriceMin,
  filterByPriceMax,
  FilterByCountry,
  filterByTypes
) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: APPLY_FILTERS,
        payload: {
          filterByPriceMin: filterByPriceMin,
          filterByPriceMax: filterByPriceMax,
          FilterByCountry: FilterByCountry,
          filterByTypes: filterByTypes,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const orderPrice = (order) => {
  return { type: ORDER_PRICE, payload: order };
};

export function firstPage() {
  return {
    type: FIRST_PAGE,
  };
}

export function prevPage(quantity) {
  return {
    type: PREV_PAGE,
    payload: quantity,
  };
}

export function nextPage(quantity) {
  return {
    type: NEXT_PAGE,
    payload: quantity,
  };
}

//se le pasa un id al loguearse
export const login = (id) => ({
  type: LOGIN,
  payload: id,
});
//salir sesion
export const logout = () => ({
  type: LOGOUT,
});

export const getUser = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlLocal}/user/info/${id}`); //get User
      return dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
