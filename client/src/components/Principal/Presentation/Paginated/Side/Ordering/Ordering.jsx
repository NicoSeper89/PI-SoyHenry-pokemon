import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCurrentArray } from '../../../../../../actions/index.js'
// import style from "./Side.module.css"

export default function Ordering() {

    const dispatch = useDispatch();
    const currentPokemonArray = useSelector((state) => state.currentPokemonArray);

    const order = (by, asc) => {

        if (by === "name") {
            asc ?
                currentPokemonArray.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0) :
                currentPokemonArray.sort((b, a) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);

            return dispatch(modifyCurrentArray(currentPokemonArray))
        }
        if (by === "attack") {
            asc ?
                currentPokemonArray.sort((a, b) => (a.attack > b.attack) ? 1 : (a.attack < b.attack) ? -1 : 0) :
                currentPokemonArray.sort((b, a) => (a.attack > b.attack) ? 1 : (a.attack < b.attack) ? -1 : 0);

            return dispatch(modifyCurrentArray(currentPokemonArray))
        }
    }

    return (
        <>
            <label >
                <button onClick={() => order("name", true)}>ORDENAR A-Z</button>
            </label>
            <label >
                <button onClick={() => order("name", false)}>ORDENAR POR Z-A</button>
            </label>
            <label >
                <button onClick={() => order("attack", false)}>ORDENAR POR FUERZA MAYOR</button>
            </label>
            <label >
                <button onClick={() => order("attack", true)}>ORDENAR POR FUERZA MENOR</button>
            </label>
        </>
    )
}