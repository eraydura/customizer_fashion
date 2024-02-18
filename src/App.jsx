import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Mug from './components/Mug'
import Shoes from './components/Shoes';
import Dress from './components/Dress';
import Cap from './components/Cap';
import Tshirt from './components/Tshirt';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/mug" element={<Mug/>}/>
          <Route exact path="/shoes" element={<Shoes/>}/>
          <Route exact path="/dress" element={<Dress/>}/>
          <Route exact path="/cap" element={<Cap/>}/>
          <Route exact path="/Tshirt" element={<Tshirt/>}/>
        </Routes>
    </Router>
  );
}
export default App;