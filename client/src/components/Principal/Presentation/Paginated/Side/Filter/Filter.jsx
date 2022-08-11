import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modifyCurrentArray, noPokemons } from '../../../../../../actions/index.js'

export default function Filter() {

    const dispatch = useDispatch()

    const arrTypes = useSelector(state => state.arrTypes);
    const arrPokemons = useSelector(state => state.arrPokemons);

    const filterOrigen = (e) => {

        let arrFilterPokemons = arrPokemons

        if (e.target.value === "originales") {
            arrFilterPokemons = arrPokemons.filter((pokemon) => !pokemon.id.toString().includes("-"))
            
        }
        if (e.target.value === "creados") {
            arrFilterPokemons = arrPokemons.filter((pokemon) => pokemon.id.toString().includes("-"))
            
        }

        if (arrFilterPokemons.length){
            dispatch(modifyCurrentArray(arrFilterPokemons))}
        else {dispatch(noPokemons())}

    }

    const filterTypes = (e) => {

        if(e.target.value === "todos") {return dispatch(modifyCurrentArray(arrPokemons))}

        const arrFilterPokemons = arrPokemons.filter((pokemon) =>
                                                ((pokemon.types[0] === e.target.value) || 
                                                (pokemon.types[1] && (pokemon.types[1] === e.target.value))))

        if (arrFilterPokemons.length){
            dispatch(modifyCurrentArray(arrFilterPokemons))}
        else {dispatch(noPokemons())}

    }

    return (
        <>
            <label > Filtrar por origen<br />
                <select onChange={filterOrigen}>
                    <option value="todos" >Todos</option>
                    <option value="originales" >Originales</option>
                    <option value="creados" >Creados</option>
                </select>
            </label>
            <label > Filtrar por Tipo <br />
                <select onChange={filterTypes}>
                    <option key={0} value="todos" >Todos</option>
                    {
                        arrTypes.map((type) => <option key={type.id} value={type.name} >{type.name}</option>)
                    }
                </select>
            </label>
        </>
    )
}