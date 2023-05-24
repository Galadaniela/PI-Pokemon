import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import  "./Landing.css"
const Landing = () => {
  return(
    <div className="landing">
    <h1 > LANDING</h1>
    <div className="Btn">
      <Link to="/Home">
      <button  className="Btnhome">
        HOME
      </button>
    </Link></div>
    
    </div>
  )
} 

export default Landing