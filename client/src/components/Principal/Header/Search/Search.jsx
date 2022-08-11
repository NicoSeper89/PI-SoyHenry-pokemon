import React, { useState } from 'react';
import style from './Search.module.css';
import { useHistory } from "react-router-dom";

export default function Search() {

    const [nameSearching, setNameSearching] = useState("");
    const history = useHistory();
    
    const onChangeName = (e) => {

        setNameSearching(e.target.value)

    }

    const searchPokemon = (e) => {
        e.preventDefault();
       
        history.push(`/pokemons?name=${nameSearching}`)

    }

    return (
            <form onSubmit={searchPokemon} className={style.formSearch}>
                <input className={style.inputSearch} value={nameSearching} onChange={onChangeName} type="text" placeholder='Buscar Pokemon'/>
                <input className={style.buttonSearch} type="submit" /> 
            </form>
    )
}