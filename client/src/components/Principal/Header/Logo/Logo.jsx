import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Header.module.css'

export default function Logo() {
    return (
        <NavLink to="/pokemons">
            <img className={styles.logo} src='https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/4ad6e-pikachu-png-background.png' alt='logo' />
        </NavLink>
    )
}


