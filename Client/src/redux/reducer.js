const initialState = {
  properties: [],
  propertyDetail:{},
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



    case "APPLY_FILTERS":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
