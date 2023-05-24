const axios = require("axios")
const {Pokemon,Type} = require("../db")

const getAllTypes = async (req,res) =>{
    try {
        const typeApi = await axios.get("https://pokeapi.co/api/v2/type")
        const dataType = typeApi.data.results.map(elem => elem.name)
        dataType.forEach(elem =>{
         Type.findOrCreate({
            where:{ name: elem}
         })
        }
            )
          const allType = await Type.findAll();
          res.status(200).json(allType)  
    } catch (error) {
        res.status(400).send({ error:  error.message });
    }
}
module.export = {getAllTypes}