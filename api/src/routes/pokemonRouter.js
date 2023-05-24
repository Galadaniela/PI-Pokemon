const {Router} =  require("express")
const {Pokemon, Type} = require("../db")
const pokemonRouter = Router()
const axios = require("axios")
const {getApiInfo, getDbInfo ,getAllPokemons,getPokemonId} = require("../controller/pokemoController")
pokemonRouter.get("/" , async (req,res) =>{
    const {name} = req.query

    const allPokemons = await getAllPokemons()
    if(name){
        const pokemonName = await allPokemons.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()))

      
    
    const result = (pokemonName.length)
        ?res.status(200).json(pokemonName)
      : res.status(400).send("no existe")
      return result 
    } 
    res.status(200).send(allPokemons)
   
})
pokemonRouter.get("/:id" , async (req,res) =>{
    const { id } = req.params;

  const source = isNaN(id) ? 'bdd' : 'api';

  try {
    const pokemonId = await getPokemonId(id, source);
    console.log(pokemonId);
    res.status(200).json(pokemonId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   

})
pokemonRouter.post("/" , async (req,res) =>{
    const {name,hp,attack,defense,speed,height,weight,img,type,createdInDb} = req.body
    
    const createPokemon = await Pokemon.create({name,hp,attack,defense,speed,height,weight,img,type,createdInDb})
     const typeDb = await Type.findAll({
        where:{
            name: type
        }
    })
  createPokemon.addType(typeDb)
  res.send("New pokemon")
})



module.exports = pokemonRouter