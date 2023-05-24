import {GET_POKEMON,GET_BY_ID,SEARCH_BY_NAME, GET_TYPE,
  POST_POKEMON,GET_DETAIL,CLEAN_FILTERS,POKEMON_FILTERS}from "./actions"
const initialState ={
    pokemon:[],
    allPokemon:[],
    filtered:[],
    pokemonId:{},
    type:[],
    detail:[]
}
const rootReducer = (state = initialState, action) => {
    console.log('CONSOLE ---reducer--', { action });
    switch(action.type){
        case GET_POKEMON:
            return{
                ...state,
                pokemon: action.payload,
                allPokemon:action.payload,
            }
       
        case GET_BY_ID:
            return{
             ...state, 
             pokemonId: action.payload
            }
        case SEARCH_BY_NAME:
                console.log(SEARCH_BY_NAME);
                return {
                  ...state,
                  pokemon: action.payload,
                };
     
         case CLEAN_FILTERS:
          return {
            ...state,
            filtered: [...[]],
            allPokemon: [...state.allPokemon],
          };
    
        case POKEMON_FILTERS:
          let pokemonFiltered = [...state.allPokemon];
          if (action.payload.type.length) {
            pokemonFiltered = [
              ...pokemonFiltered.filter((e) =>
                e.type.includes(action.payload.type)
              ),
            ];
          }
          if (action.payload.rating.length) {
            pokemonFiltered = [
              ...pokemonFiltered.sort((a, b) => {
                if (action.payload.rating === 'strg-asc') {
                  return a.attack - b.attack;
                }
                return b.attack - a.attack;
              }),
            ];
          }
          if (action.payload.alphabetical.length) {
            if (action.payload.alphabetical === 'asc') {
              pokemonFiltered = [
                ...pokemonFiltered.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  return 0;
                }),
              ];
            }
            if (action.payload.alphabetical === 'desc') {
              pokemonFiltered = [
                ...pokemonFiltered.sort((a, b) => {
                  if (a.name > b.name) return -1;
                  if (a.name < b.name) return 1;
                  return 0;
                }),
              ];
            }
          }
          if (action.payload.created.length) {
            if (action.payload.created === 'created') {
              pokemonFiltered = [
                ...pokemonFiltered.filter((el) =>
                  el.hasOwnProperty('createdInDb5')
                ),
              ];
            }
          }
          return { ...state, filtered: [...pokemonFiltered] };

         case POST_POKEMON:
          return{
              ...state
          }
      case  GET_TYPE:
          return{
              ...state,
              Type: action.payload
          }
      case GET_DETAIL :
        return{
          ...state,
          detail: action.paylode
        }

            default:
      return { ...state };
    }

}




export default rootReducer