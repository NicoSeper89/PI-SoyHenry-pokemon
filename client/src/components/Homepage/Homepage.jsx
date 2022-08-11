import React from 'react';
import style from './Homepage.module.css';
import { NavLink } from 'react-router-dom';


export default function Homepage() {
    return (
        <div className={style.homepage}>
            <>  
                <img className={style.logo} src='https://i.postimg.cc/66mSxG06/Sin-t-tulo-1.png' alt='pokeLogo'></img>
                <NavLink to="/pokemons">
                    <button className={style.button}>INGRESAR</button>
                </NavLink>
            </>
        </div>
    )
}