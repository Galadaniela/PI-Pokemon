import React from "react"
import "./paginado.css"

const Paginado = ({pokemonPerPage,allPokemon,paginado,avanza, retrocede}) =>{

    const pageNumbers = []

    for(let i=0; i<=Math.ceil(allPokemon/pokemonPerPage); i++){ pageNumbers.push(i)}

    return(
       <nav>
           <ul className="paginado">
           <button className='btn' onClick={retrocede}>{`< `}</button>
            { 
                pageNumbers?.map(e =>
                    <button className='btn' key={e} onClick={()=> paginado(e)}>{e}</button>
                )
            }
            <button className='btn' onClick={avanza}>{` >`}</button>
                 
           </ul>
       </nav>
    )
}




export default Paginado 