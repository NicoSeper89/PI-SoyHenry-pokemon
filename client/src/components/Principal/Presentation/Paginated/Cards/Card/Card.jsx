import React from "react";
import { NavLink } from 'react-router-dom';
import style from "./Card.module.css"

export default function Card({ name, img, types, id }) {
    return (<NavLink to={`/pokemons/${id}`}>
        <div className={`${style.conteiner} ${style[types[0]]}`}>
            <h1>
                {name}
            </h1>
            <h3>
                {types[0]}
                {types[1] ? <span>{(` - ${types[1]}`)}</span> : null}
            </h3>
            <div className={style.img}>
                <img style={{zIndex: 2}} src={img} alt={`pic${name}`} />
                <div className={`${style.typeCircle}`}></div>
            </div>
        </div>
    </NavLink>
    )
}