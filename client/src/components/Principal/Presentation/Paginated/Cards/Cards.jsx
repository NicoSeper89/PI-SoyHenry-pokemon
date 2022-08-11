import React from "react";
import { connect } from "react-redux";
import Card from "./Card/Card.jsx";
import style from "./Cards.module.css"

function Cards({ currentPokemonArray, paginationNumber}) {


    return (
        <div className={style.cards}>
            {
                currentPokemonArray.slice((paginationNumber - 1) * 12, paginationNumber * 12)
                    .map(p => <Card
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        img={p.img}
                        types={p.types} />)
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        currentPokemonArray: state.currentPokemonArray,
        paginationNumber: state.paginationNumber,
        
    }
}




export default connect(mapStateToProps, null)(Cards);