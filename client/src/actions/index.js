import axios from 'axios';

export function receivePokemon(arrPoke) {
  return {
    type: 'RECEIVE_POKEMON',
    arrPoke
  }
}

export function receiveTypes(types) {
  return {
    type: 'RECEIVE_TYPES',
    types
  }
}

export function loading() {
  return {
    type: 'LOADING'
  }
}

export function noPokemons() {
  return {
    type: 'NO_POKEMONS'
  }
}

export function changePagination(paginationNumber) {
  return {
    type: 'CHANGE_PAGINATION',
    paginationNumber
  }
}

export function modifyCurrentArray(currentPokemonArray) {
  return {
    type: 'MODIFY_CURRENT_ARRAY',
    currentPokemonArray
  }
}

/* export function receiveDetailsPokemon(detailsPokemon) {
  return {
    type: 'RECEIVE_DETAILS_POKEMON',
    detailsPokemon
  }
} */

export function callToBackend() {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`http://localhost:3001/pokemons`)
      .then(r => r.data)
      .then(d => { dispatch(receivePokemon(d)); dispatch(getTypes()) })
      .catch(e => console.log("No funciono la llamada"));
  }
}

export function getTypes() {
  return (dispatch) => {
    axios.get(`http://localhost:3001/types`)
      .then(r => r.data)
      .then(d => dispatch(receiveTypes(d)))
      .catch(e => console.log("No funciono la llamada"));
  }
}

/* export function getPokemonDetails(id) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`http://localhost:3001/pokemons/${id}`)
      .then(r => r.data)
      .then(d => dispatch(receiveDetailsPokemon(d)))
      .catch(e => console.log("No funciono la llamada"));
  }
} */