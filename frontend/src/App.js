// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovie';
import "./App.css"
import EditMovie from './components/EditMovie';
// Other necessary imports

function App() {
const [token,setToken]=useState("")
  
  useEffect(()=>{
const tok=localStorage.getItem("token")
setToken(tok)
  },[])
  return (
    <Router>
      
      <div className="App"  >
        <Routes>
        <Route path="/" element={token ? <Navigate to="/movies" /> : <Login />} />
          <Route path="/movies" element={<MovieList/>} />
          <Route path="/edit-movie/:id" element={<EditMovie/>} />
          <Route path="/add-movie" element={<AddMovieForm/>} />
        </Routes>
        {/* Other routes */}
      </div>
    </Router>
  );
}

export default App;
