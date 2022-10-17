import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeHeader from './components/Header';

const App = () => {

  return (
    <div className='App'>
        <HomeHeader name={"Pokemon"} author={'@pokemonGroup'}/>
    </div>
  );
}

export default App;
