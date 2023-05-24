import React from "react"
import "./card.css"
const Card = ({name,type,img}) => {
    return(
    <div className="container">
        <h3>{name}</h3>
         <h5>{ type}</h5>
         <img src={img} alt="img not fund" width="300px" height="300px" />
    </div>
    )
}

export default Card