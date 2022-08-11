import React from 'react';
import { useSelector } from "react-redux";
import Button from './Button.jsx';
import style from './Buttons.module.css'

export default function Buttons() {

    const countPokemon = useSelector(state => state.countPokemon)

    const impBotton = (n) => {

        const arrButtons = [];

        for (let i = 1; i <= n; i++) {
            arrButtons.push(<Button key={i} id={i}/>)
        }
        return arrButtons
    }

    return (
        <div className={style.buttons} >
           {impBotton(Math.ceil(countPokemon/12))}
        </div>
    )
}