import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Create() {
    return (
        <NavLink to="/pokemons/create">
            <button>Nuevo Pokemon</button>
        </NavLink>
    )
}