const {Pokemon, Type} = require("../db")
const axios = require("axios")

const getApiInfo = async () =>{

    const prevPokUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const nxtPokUrl = await axios.get(prevPokUrl.data.next)

    const allInfo =[...prevPokUrl.data.results,
    ...nxtPokUrl.data.results]

    const apiUrl = await Promise.all(allInfo.map(async (elem) => {
      const pokemon = await axios(elem.url);
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          hp: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          
          img: pokemon.data.sprites.front_default,
          type: pokemon.data.types.map((Type) => Type.type.name),
        };
      }))
    return apiUrl
}
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attribute:["name"],
            through:{
                attribute:[],
            }
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();

    const allInfo = apiInfo.concat(DbInfo)
    return allInfo
}
const getPokemonId = async (id,source) =>{
  
  if( source === "api"){
    const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return{
      id: pokemonApi.data.id,
          name: pokemonApi.data.name,
          hp: pokemonApi.data.stats[0].base_stat,
          attack: pokemonApi.data.stats[1].base_stat,
          defense: pokemonApi.data.stats[2].base_stat,
          speed: pokemonApi.data.stats[5].base_stat,
          height: pokemonApi.data.height,
          weight: pokemonApi.data.weight,
        
          img: pokemonApi.data.sprites.front_default,
          type: pokemonApi.data.types.map(Type => Type.type.name)
    }
  }else 
  if(source === "bdd" && id === "string" && id.length > 6) {
    const pokemonDatb= await Pokemon.findByPk(id,{
      where:{
        id:id
      },
      include:{
        module: Type
      },
    }) 
    const pokemonDb ={
   
      id: pokemonDatb.id,
              name: pokemonDatb.name,
              type: pokemonDatb.types.map((t) => t.name),
              img: pokemonDatb.img,
              attack: pokemonDatb.attack,
              defense: pokemonDatb.defense,
              speed: pokemonDatb.speed,
              height: pokemonDatb.height,
              weight: pokemonDatb.weight,
    }
    console.log(pokemonDb );
    return pokemonDb  
  }









}


module.exports ={ getApiInfo, getDbInfo ,getAllPokemons , getPokemonId}