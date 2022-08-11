import React from 'react';
import { useSelector } from 'react-redux';
import Buttons from "./Buttons/Buttons.jsx";
import Cards from "./Cards/Cards.jsx";
import Side from "./Side/Side.jsx";
import style from "./Paginated.module.css";

export default function Paginated() {

    const noPokemon = useSelector(state => state.noPokemons)

    return (
        <div className={style.paginated}>
            <div className={style.side}>
                <Side />
            </div>
            <div className={style.cards}>

              {
                noPokemon? 
                <div >NO SE ENCONTRARON POKEMON PARA EL FILTRADO</div>: 
                <><Buttons /><Cards /><Buttons /> </>       
              }
            </div>
            
        </div>
    )
}