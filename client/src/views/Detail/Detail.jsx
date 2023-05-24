
import React from "react"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { useEffect } from 'react';

const Detail = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);



  return (
    <div>
      <h1>Name: {pokemon.name}</h1>
     <img src={pokemon.img? pokemon.img:pokemon.img} alt="" />
     <h1>hp: {pokemon.hp}</h1>
      <h1>attack: {pokemon.attack}</h1>
      <h1>defense: {pokemon.name}</h1>
      <h1>speed: {pokemon.speed}</h1>
      <h1>height {pokemon.height}</h1>
        <h1>weight: {pokemon.weight}</h1>
      <h4>Type: {!pokemon.createdInDb? pokemon.type + " ": pokemon.type.map(elem => elem.name + (" "))}</h4>

      <Link to="/Home">
            <button>Back</button>
        </Link>
    </div>
  );
};

export default Detail;
