import React from 'react';
import { Route, } from 'react-router-dom';
import styles from './Presentation.module.css';
import Paginated from './Paginated/Paginated.jsx';
import Details from './Details/Details.jsx';
import Create from './Create/Create.jsx';
import { useSelector } from 'react-redux';


export default function Presentation() {

    const loading = useSelector((state) => state.loading)

    return (
        <div className={styles.presentation}>

            <Route exact path={`/pokemons`} 
                         render={({location})=> loading? <h1>cargando POKEMON</h1> : 
                                                         location.search.includes("name")? <Details location={location} /> : <Paginated />
                                                        
                                                        } />


            <Route path={`/pokemons/:id`}  
                   render={({match})=>(match.params.id === "create")? 
                                                            (loading?<h1>cargando TIPOS</h1>:<Create />) : <Details />}/>

        </div>
    )
}