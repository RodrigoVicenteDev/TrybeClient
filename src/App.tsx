import * as React from 'react';
import {Route ,Routes } from "react-router-dom"
import Sigin from './pages';
import './App.css';
import Login from './pages/login';
import Paginaprincipal from './pages/paginaprincipal';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/sigin" element= {<Sigin/>}/>
      <Route path="/" element= {<Login/>}/>
      <Route path="principal" element={<Paginaprincipal/>} />


      </Routes>
     
    </div>
  );
}

export default App;
