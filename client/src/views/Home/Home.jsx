import React from "react"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {getPokemons,cleanFilters,
  pokemonFilters,} from "../../redux/actions"
import Card from "../../components/Card/Card"
import Paginado from "../../components/Paginado/Paginado";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css"

const Home = () => { 
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.pokemon)
  const filteredPokemon = useSelector((state) => state.filtered)
  console.log('CONSOLE ---Home--', { filteredPokemon, allPokemon});
  const [filters, setFilters] = useState({
    type: '',
    alphabetical: '',
    rating: '',
    created: '',
  });
  let isSelectedFilter = Object.values(filters).some((value) => value.length); 

const [currentPage , setCurrentPage] = useState(1)
const [pokemonPerPage,serPokemonPerPage] = useState(12)
const indexOfLastPokemon = currentPage * pokemonPerPage
const indexOfFistPokemon = indexOfLastPokemon - pokemonPerPage
const currentPokemon = filteredPokemon && allPokemon.slice(indexOfFistPokemon,indexOfLastPokemon)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilters(typeFilter, valueFilter) {
    const newFilters = { ...filters, [typeFilter]: valueFilter };
    if (valueFilter.length) {
      dispatch(pokemonFilters(newFilters));
    }
    setFilters(newFilters);
  }

  function handleCleanFilters() {
    setFilters({ type: '', alphabetical: '', rating: '', created: '' });
    dispatch(cleanFilters());
  }
  
 
  useEffect(() => {
    if (!isSelectedFilter) {
      dispatch(cleanFilters());
    }
  }, [isSelectedFilter]);

  console.log('CONSOLE ---Home--', { isSelectedFilter, filters });
  return(
    <> 
    <div className="home">
    <h1>Pokemon</h1>
     <div className="Create ">
      <Link to='/Form'>
        <button className="Create ">Create Pokemon</button>
      </Link>
      <button className="lim" onClick={handleCleanFilters}>Limpiar Filtros</button>
      </div>
       <div className="bar">
      <SearchBar/>
</div>
     <div>
        <select className="func" onChange={(e) => handleFilters('rating', e.target.value)}>
          <option value={''}>Ordenar por valoracion</option>
          <option value='strg-asc'>Acendente</option>
          <option value='strg-desc'>Decendiente</option>
        </select>
        
         <select  className="abf"  onChange={(e) => handleFilters('alphabetical', e.target.value)}>
          <option value={''}>Ordenar Alfabeticamente</option>
          <option value='asc'>A to Z</option>
          <option value='desc'>Z to A</option>
        </select>
        
        <select  className="all"  onChange={(e) => handleFilters('created', e.target.value)}>
          <option value={''}>All Pokemons</option>
          <option value='created'>Create</option>
          <option value='api'>Existing</option>
        </select>
      </div>
    <div>
       
      </div>
    <div>
    <select className="type" onChange={(e) => handleFilters('type', e.target.value)}>
          <option value={''}>All Pokemons</option>
        <option value="All">Pokemons</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragons</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
      </select>
    </div>
    <div>
    
    </div>
    <Paginado
      pokemonPerPage = {pokemonPerPage}
      allPokemon = {allPokemon.length}
      paginado={paginado}
   />
  
   {/* {currentPokemon && filteredPokemon && filteredPokemon.length.map((elem,index) => {
          return (
            <div>
              <Link to={'/Home' + elem.id}>
                <Card
                  name={elem.name}
                  type={elem.type}
                  img={elem.img}
                  key={index.id}
                />
              </Link>
            </div>
          );
        })}  */}

    {isSelectedFilter && filteredPokemon && filteredPokemon.length
        ? filteredPokemon.map((elem, index) => {
            return (
              <Link to={'/Home' + elem.id}>
                <Card
                  key={index}
                  name={elem.name}
                  img={elem.img}
                  type={elem.type}
                />
              </Link>
            );
          })
        : null}

{isSelectedFilter && !filteredPokemon.length ? (
        <div>No se encontraron resultados para los filtros aplicados..</div>
      ) : null}

{!isSelectedFilter && allPokemon.length
        ? allPokemon.map((elem, index) => {
            return (
              <Link to={'/Home' + elem.id}>
                <Card
                  key={index}
                  name={elem.name}
                  img={elem.img}
                  type={elem.type}
                />
              </Link>
            );
          })
        : null}
      </div>  
   </>

  )
} 

export default Home