const initialState = {
  properties: [],
  propertyDetail: {},
  allProperties: [],
  page: [],
  searchTerm: "",
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

    default:
      return state;
  }
};

export default rootReducer;

