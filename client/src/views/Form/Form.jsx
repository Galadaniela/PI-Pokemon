import React from "react";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postPokemon,getType } from "../../redux/actions";
import { useDispatch , useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Form.css"

const validate = (input) => {
let errors = {}
console.log(errors)
if(!input.name){
  errors.name = "*Name  is required*"
}
if(!input.hp || input.hp < 10 || input.hp > 100){
    errors.hp = "*hp is required*"
    if(input.hp < 10 ) errors.hp = "*Min hp is 10*"
    else if (input.hp > 100) errors.hp = "*Max hp is 100*"
    
}
if(!input.attack || input.attack < 10 || input.attack > 100){
  errors.attack = "*attack is required*"
  if(input.attack < 10 ) errors.attack = "*Min attack is 10*"
  else if (input.attack > 100) errors.attack = "*Max attack is 100*"
  
}
if(!input.defense || input.defense < 10 || input.defense > 100){
  errors.defense = "* defense is required*"
  if(input.defense < 10 ) errors.defense = "*Min defense is 10*"
  else if (input.defense > 100) errors.defense = "*Max  defense is 100*"
}
if(!input.speed || input.speed < 10 || input.speed > 100){
  errors.speed = "* speed is required*"
  if(input.speed < 10 ) errors.speed = "*Min speed is 10*"
  else if (input.speed > 100) errors.speed = "*Max  speed is 100*"
}
if(!input.height || input.height < 10 || input.height > 100){
  errors.height = "* height is required*"
  if(input.height < 10 ) errors.height = "*Min height is 10*"
  else if (input.height > 100) errors.height = "*Max  height is 100*"
}
if(!input.weight || input.weight < 10 || input.weight > 100){
  errors.weight = "* weight is required*"
  if(input.weight < 10 ) errors.weight = "*Min weight is 10*"
  else if (input.weight > 100) errors.weight = "*Max  weight is 100*"
}
if(!input.img){
  errors.img = "*Image  is required*"
}
if(!input.type.length){
  errors.type = "*Type  is required*"
}
return errors

};


const Form = () => {
  const dispatch = useDispatch()
  const Type = useSelector((state) => state.Type)
  const history = useHistory()
 const [errors, setErrors] = useState({})

  const [input,setInput] = useState({
    name:'',
    hp:0,
    attack:0,
    defense:0,
    speed:0,
    height:0,
    weight:0,
    img:'',
    type: []
  })

  function handleType(e){
    setInput({
      ...input,
      [e.target.name]: [...input.type, e.target.value],
    })
    console.log(input);
  }
  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]:e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name]:e.target.value
  }))
  } 
  function handleSelect(e){
    setInput({
      ...input,
      type:[...input.type, e.target.value]
    })

  }
  // function handleCheck(e){
  //   if(e.target.checked){
      
  //   }
  // }
  function handleDelete(elem){
    setInput({
      ...input,
      type: input.type.filter(ty => ty !== elem)
    })
  }
  function handleSubmit(e){
   e.preventDefault()
   dispatch(postPokemon(input))
   alert("Pokemon Creado")
   setInput({
   name:'',
   hp:0,
   attack:0,
   defense:0,
   speed:0,
   height:0,
   weight:0,
   img:'',
   type: []
  })
  history.push("/Home")
  }
   useEffect(() => {
    dispatch(getType())
},[dispatch])
console.log(errors)

  return(
    <>
    
    <div className="form">
    <Link to="/Home">
            <button className="btn">Back</button>
        </Link>
        <h1>Creat New Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input">
                <label htmlFor="name">Name:</label>
                <input  type="text" value={input.name} name="name"
                onChange={(e) =>handleChange(e)} 
                />
                 {errors.name && (
                  <p className="error">{errors.name}</p>
                 )}
            </div>
        <div className="input">
        <label htmlFor="hp">HP:</label>
                <input type="number"value={input.hp} name="hp"
                onChange={(e) =>handleChange(e)}/>
                  {errors.hp && 
                (
                  <p className="error">{errors.hp}</p>  
                  
                 ) } 
                 
        </div>
     
        <div className="input">
        <label htmlFor="attack">Attack:</label>
                <input type="number" value={input.attack} name="attack"
                onChange={(e) =>handleChange(e)}/>
                {errors.attack && 
                (<p className="error">{errors.attack}</p> ) } 
        </div>
        <div className="input">
        <label htmlFor="defense">Defense:</label>
                <input type="number" value={input.defense} name="defense"onChange={(e) =>handleChange(e)}/>
                {errors.defense && 
                (<p className="error">{errors.defense}</p> ) } 
        </div>
        <div className="input">
        <label htmlFor="speed">speed:</label>
                <input type="number" value={input.speed} name="speed"onChange={(e) =>handleChange(e)}/>
                {errors.speed && 
                (<p className="error">{errors.speed}</p> ) } 
        </div>
         <div className="input">
        <label htmlFor="height">height:</label>
                <input type="number" value={input.height} name="height"onChange={(e) =>handleChange(e)}/>
                {errors.height && 
                (<p className="error">{errors.height}</p> ) } 
        </div>
        <div className="input">
        <label htmlFor="weight">weight:</label>
                <input type="number" value={input.weight} name="weight"onChange={(e) =>handleChange(e)}/>
                {errors.weight && 
                (<p className="error">{errors.weight}</p> ) } 
        </div>
      <div className="input">
      <label htmlFor="img">Image:</label>
                <input type="text"value={input.img} name="img" onChange={(e) =>handleChange(e)}/>
                {errors.img && 
                (<p className="error">{errors.img}</p> ) } 
      </div>
      
      <div className="input">
                  <label htmlFor="">Type:</label>
                  <select name="" id="" onChange={(e) =>handleSelect(e)}>
                { Type?.map((ty) => (
                  <option value={ty.name}>{ty.name}</option>
                ))}
                  </select>
                  <ul><li>{input.type.map(elem => elem + ",")}</li></ul>
                  {errors.type && 
                (<p className="error">{errors.type}</p> ) } 
                </div>
                <button className="btn" type="submit">Crear Personaje</button>
                </form>
                {input.type.map(elem =>
                  <div className="divTy">
                    <p>{elem}</p>
                    <button className="botonX" onClick={() => handleDelete(elem)}>X</button>
                  </div>
                  )}
                
    </div>
    </>
  )
} 

export default Form