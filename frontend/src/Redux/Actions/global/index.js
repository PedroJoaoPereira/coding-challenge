import {
  LOGIN_AUTH,
  FETCH_COUNTRIES,
  ADD_PERSON,
  SET_PERSON,
  ERROR
} from "./types";

const dispatcher = (type, payload, callback) => callback({ type, payload });

export const fetchToken = (username, password) => dispatch => {
  const url = `http://localhost:3000/api/auth/login`;

  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.error)
        return dispatcher(ERROR, responseData.message, dispatch);

      return dispatcher(
        LOGIN_AUTH,
        { authToken: responseData.token },
        dispatch
      );
    })
    .catch(() => dispatcher(ERROR, "Cannot get Item", dispatch));
};

export const fetchCountries = () => dispatch => {
  const url = `http://localhost:3000/api/countries`;

  setTimeout(() => {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error)
          return dispatcher(ERROR, responseData.message, dispatch);

        return dispatcher(
          FETCH_COUNTRIES,
          { countries: responseData },
          dispatch
        );
      })
      .catch(() => dispatcher(ERROR, "Cannot get Item", dispatch));
  }, 3 * 1000);
};

export const createCountry = (token, name, alpha2Code) => dispatch => {
  let url = `http://localhost:3000/api/countries`;

  fetch(url, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, alpha2Code })
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.error)
        return dispatcher(ERROR, responseData.message, dispatch);

      url = `http://localhost:3000/api/countries`;

      return fetch(url)
        .then(responseAux => responseAux.json())
        .then(responseDataAux => {
          if (responseDataAux.error)
            return dispatcher(ERROR, responseDataAux.message, dispatch);

          return dispatcher(
            FETCH_COUNTRIES,
            { countries: responseDataAux },
            dispatch
          );
        })
        .catch(() => dispatcher(ERROR, "Cannot get Item", dispatch));
    })
    .catch(() => dispatcher(ERROR, "Cannot get Item", dispatch));
};

export const addNewPerson = (name, surname, country, birthday) => dispatch =>
  dispatcher(ADD_PERSON, { name, surname, country, birthday }, dispatch);

export const setPerson = person => dispatch =>
  dispatcher(SET_PERSON, person, dispatch);
