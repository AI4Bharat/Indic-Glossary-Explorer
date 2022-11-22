import C from "../../constants";

let initialState = {
  data: [],
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_LANGUAGE_COUNT_DATA:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
