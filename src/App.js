import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import Soup from './components/Soup'; 
import FriedRice from './components/FriedRice';
import Wonton from './components/Wonton';
import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/firestore'; // Import Firestore
import firebaseConfig from './components/firebaseConfig'; // Import Firebase config

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soup" element={<Soup />} />
        <Route path="/wonton" element={<Wonton />} />
        {/* Pass Firestore instance as prop */}
        <Route path="/fried-rice" element={<FriedRice />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
