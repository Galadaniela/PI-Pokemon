import axios from "axios";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_TYPE = "GET_POKEMON_TYPE"
export const GET_BY_ID = "GET_BY_ID"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const  ORDER_BY_ALPHABETICAL = " ORDER_BY_ALPHABETICAL";
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const FILTER_BY_CREATED = "FILTER_BY_CREATED"
export const GET_TYPE = "GET_TYPE"
export const FILTER_CREATE= "FILTER_CREATE"
export const POST_POKEMON = "POST_POKEMON"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAN_FILTERS = "CLEAN_FILTERS"
export const POKEMON_FILTERS = "POKEMON_FILTERS"

export const getPokemons = () => {
    return async function (dispatch){
        const apiData = await axios.get("http://localhost:3001/pokemon")
        const pokemon = apiData.data;
        dispatch({type: GET_POKEMON, payload: pokemon})
    }
}
export const getPokemonType =  (type) => {
    return async function (dispatch) {
        dispatch({type: GET_POKEMON_TYPE, payload:type})
    }
}

export const getPokemonId = (id) => {
  return async function (dispatch) {
    const Id = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const data = Id.data;
    dispatch({
      type: GET_BY_ID,
      payload: data,
    });
  };
}
export const searchByName = (name) => {
return async function (dispatch){
    const searchName = await axios.get(`http://localhost:3001/pokemon?name=` + name)
    const data = searchName.data;
    dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
}
}
export const orderByAlphabetical = (type) =>{
    return function (dispatch) {
        dispatch({
          type: ORDER_BY_ALPHABETICAL,
          payload: type,
        });
      };
};
export const orderByRating = (type) => {
    return function (dispatch) {
      console.log({ type });
      dispatch({
        type: ORDER_BY_RATING,
        payload: type,
      });
    };
  };
  export const filterByCreated = (order) => {
    return function (dispatch) {
      console.log(order);
      dispatch({
        type: FILTER_BY_CREATED,
        payload: order,
      });
    };
  };
export const getType = () => {
  return async function (dispach) {
    axios
      .get('http://localhost:3001/type')
      .then((res) => {
        dispach({ type: GET_TYPE, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}
export const postPokemon = (payload) => {
  return async function (dispatch){
    const creatGame = await axios.post("http://localhost:3001/pokemon",payload)
    return creatGame
  }
}
export const filterCreated = (payload) =>{
  console.log(payload);
  return{
      type: FILTER_CREATE,
      payload
  }
}
export const getDetail = (id) =>{
  return async function (dispatch) {
    const detailId = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const data = detailId.data;
    dispatch({
      type: GET_DETAIL,
      payload: data,
    });
  };
}
export const cleanFilters = () => {
  return {
    type: CLEAN_FILTERS,
  };
};

export const pokemonFilters = (filters) => {
  return {
    type: POKEMON_FILTERS,
    payload: filters,
  };
};