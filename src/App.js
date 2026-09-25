import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'firebase/auth';
import { Log, Sign, Home, PageNotFound } from './pages';
import UserContext from './context/UserContext.js';
import Footer from './layout/footer.js';
import Header from './layout/header.js';
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebase/index.js';

//init firebase 
firebase.initializeApp(firebaseConfig);


const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
      <Header></Header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Sign />} />
          <Route path='/login' element={<Log />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        ,<Footer></Footer>
      </UserContext.Provider>
    </Router>
  );
};

export default App;