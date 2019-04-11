import {
  LOGIN_AUTH,
  FETCH_COUNTRIES,
  ADD_PERSON,
  SET_PERSON,
  ERROR
} from "Redux/Actions/global/types";

const initialState = {
  authToken: "",
  countries: [],
  persons: [],
  newPerson: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_AUTH:
      return {
        ...state,
        authToken: action.payload.authToken
      };
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload.countries
      };
    case ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat(action.payload),
        newPerson: action.payload
      };
    case SET_PERSON:
      return {
        ...state,
        newPerson: action.payload
      };
    case ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
