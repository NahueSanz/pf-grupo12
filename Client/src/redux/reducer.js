const initialState = {
  properties: [],
  propertyDetail: {},
  allProperties: [],
  page: 1,
  searchTerm: "",
  loggedIn: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROPERTIES":
      return {
        ...state,
        properties: action.payload,
        allProperties: action.payload,
        searchTerm: "",
      };

    case "GET_PROPERTY_DETAIL":
      return {
        ...state,
        propertyDetail: action.payload,
      };

    case "GET_PROPERTIES_BY_NAME":
      return {
        ...state,
        searchTerm: action.searchName,
        properties: action.payload,
      };

    case "SEARCH_BY_TITLE":
      return{
        ...state,
        properties: action.payload
      }

    case "APPLY_FILTERS":

      var filteringProperties = [...state.allProperties]
      // Aplicar el filtro filterByPriceMin
      if(action.payload.filterByPriceMin!==""){
        filteringProperties = filteringProperties.filter((property) => property.price >= action.payload.filterByPriceMin)
      }
      
      // Aplicar el filtro filterByPriceMax

      if(action.payload.filterByPriceMax!==""){
        filteringProperties = filteringProperties.filter((property) => property.price <= action.payload.filterByPriceMax)
      }

      // Aplicar el filtro filterByCountry
      if(action.payload.FilterByCountry!==""){
        filteringProperties = filteringProperties.filter((property) => property.country.includes(action.payload.FilterByCountry))
      }
      
      // Aplicar el filtro filterByTypes
      if (action.payload.filterByTypes.length > 0) {
        filteringProperties = filteringProperties.filter((property) =>action.payload.filterByTypes.includes(property.type));
      }
      return {
        ...state,
        properties: filteringProperties,
        page:1,
        searchTerm: "",
      };

      case "ORDER_PRICE":
        if (action.payload === "All") {
          return {
            ...state,
            properties: state.allProperties, // Mostrar los datos sin ordenar
          };
        } else {
          const orderPrice = state.properties.slice().sort((a, b) => { 
            if (action.payload === "A") {
              return a.price - b.price;
            } else if (action.payload === "D") {
              return b.price - a.price;
            }
          });
          return {
            ...state,
            properties: orderPrice, // Mostrar los datos ordenados
          };
        }

        case "FIRST_PAGE":
          return {
            ...state,
            page:1,
          };
        case "PREV_PAGE":
          return {
            ...state,
            page: state.page-1,
          };
        case "NEXT_PAGE":
          return {
            ...state,
            page: state.page+1,
          };
          
          case "LOGIN":
      return {
        ...state,
        loggedIn: true,
      };
      case "LOGOUT":
        return {
          ...state,
          loggedIn: false,
        };

    default:
      return state;
  }
};

export default rootReducer;

