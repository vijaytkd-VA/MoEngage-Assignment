import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import BreweryDetail from './BreweryDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/brewery/:id" element={<BreweryDetail />} />
    </Routes>
  </Router>
);

export default App;
