const initialState = {
    loading: false,
    arrPokemons: [],
    currentPokemonArray: [],
    arrTypes: [],
    paginationNumber: "1",
    countPokemon: 0,
    noPokemons: false
}

function rootReducer(state = initialState, actions) {
    switch (actions.type) {
        case 'RECEIVE_POKEMON':
            return {
                ...state,
                arrPokemons: actions.arrPoke,
                currentPokemonArray: actions.arrPoke.slice(), //No guardar referencias iguales con el de arriba
                countPokemon: actions.arrPoke.length
            }
        case 'RECEIVE_TYPES':
            return {
                ...state,
                loading: false,
                arrTypes: actions.types
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'NO_POKEMONS':
            return {
                ...state,
                noPokemons: true
            }
        case 'CHANGE_PAGINATION':
            return {
                ...state,
                paginationNumber: actions.paginationNumber
            }
        case 'MODIFY_CURRENT_ARRAY':
            return {
                ...state,
                noPokemons: false,
                currentPokemonArray: actions.currentPokemonArray.slice(),
                countPokemon: actions.currentPokemonArray.slice().length,
                paginationNumber: "1",
                
            }
        default:
            return { ...state };
    }
}

export default rootReducer;