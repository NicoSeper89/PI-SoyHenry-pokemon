import React, { useEffect } from 'react';
import { Route, } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import './App.css';
import Homepage from './components/Homepage/Homepage.jsx';
import Principal from './components/Principal/Principal.jsx';
import {callToBackend} from './actions/index.js';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(callToBackend())
  }, [dispatch])

  return (
    <div className="App">
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/pokemons">
        <Principal />
      </Route>
    </div>
  );
}

export default App;
