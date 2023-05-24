import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchByName } from "../../redux/actions"
import "./SearchBar.css"
const SearchBar = () => {
    const dispatch = useDispatch()
   const [name , setName] = useState("")
   
   function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name);
  }
  function handleSubmit(e){
      e.preventDefault()
      dispatch(searchByName(name))
  }
     return(
      <div className="searcbar">
          <input className="search" type="text" placeholder=" Search"
          onChange={e => handleInputChange(e)}/>
          <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
      </div>
     )
}
export default SearchBar 