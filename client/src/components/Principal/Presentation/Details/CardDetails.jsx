import React from 'react';
import style from './CardDetails.module.css'

export default function CardDetails(props) {

    const { details } = props

    return (
        <div className={style.card}>
            <img src={details.img} alt={`photoPokemon${details.id}`} /> 
            <div>
                <h1>Nombre: {details.name}</h1>
                <h2>Tipo: {details.types[0]}{details.types[1] ? `/${details.types[1]}` : null}</h2>
            </div>
            <div>
                <span>Salud: {details.hp} Ataque: {details.attack}</span> <br/>
                <span>Defensa: {details.defense} Velocidad: {details.speed}</span>
            </div> 
            <div>
                <span>Peso: {details.height} Altura: {details.weight}</span>
            </div> 
        </div>
    )
}
