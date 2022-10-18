import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeHeader from './components/Header';
import Home from './components/Home';

const App = () => {

  return (
    <div className='App'>
        <Home/>
    </div>
  );
}

export default App;
