import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDetails from './CardDetails.jsx';
import { useParams } from "react-router-dom";
import style from './Details.module.css';

const submitDetailsPokemon = (d) => {

    if (!Object.keys(d).length) { return (<img src="https://i.pinimg.com/originals/0c/4b/61/0c4b61db17a53de6ba0f4ffa3b842c2b.gif" alt="loading" />) }
    else if (d.hasOwnProperty("message")) { return (<>ERROR: ${d.message}</>) }

    return <CardDetails details={d} />
}

export default function Details({location}) {

    const { id } = useParams();
    const [details, setDetails] = useState({})

    useEffect(() => {

        if(id) {

         axios.get(`http://localhost:3001/pokemons/${id}`)
                    .then(r => setDetails(r.data))
                    .catch(e => setDetails(e))}

        if(location){
            
            const pokeName = new URLSearchParams(location.search).get("name");
            console.log(pokeName)

            axios.get(`http://localhost:3001/pokemons?name=${pokeName}`)
                        .then(r => setDetails(r.data))
                        .catch(e => setDetails(e))
        }
            
    }, [id, location]);

    useEffect(() => {
        return setDetails({});
    }, [setDetails])


    return (
        <div className={style.details}>
            {
                submitDetailsPokemon(details)
            }
        </div>
    )
}