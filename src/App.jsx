import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Mug from './components/Mug'
import Shoes from './components/Shoes';
import Dress from './components/Dress';
import Cap from './components/Cap';
import Tshirt from './components/Tshirt';
import Choosen from './components/Choosen';
import Text from './components/Text';
import Hoodie from './components/Hoodie';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/mug" element={<Mug/>}/>
          <Route exact path="/shoes" element={<Shoes/>}/>
          <Route exact path="/dress" element={<Dress/>}/>
          <Route exact path="/cap" element={<Cap/>}/>
          <Route exact path="/Tshirt" element={<Tshirt/>}/>
          <Route exact path="/choosen" element={<Choosen/>}/>
          <Route exact path="/hoodie" element={<Hoodie/>}/>
          <Route exact path="/home" element={<Text/>}/>
        </Routes>
    </Router>
  );
}
export default App;