import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';


function App() {
  const navigate = useNavigate();

  return (
    <div>
      <header className='App-header'>
        <h1>Welcome to the Dashboard</h1>
        </header>
          
        <main className='App-body'>
        <form>
        <div className="input-group">
          <label htmlFor="token">Enter a token</label>
          <input type="text" id="token" />
          <button type="submit" className='btn btn-secondary'>
          Join Room
        </button>
        </div>
        </form>
        <div>
        <Link to="/dashboard">
           <button className='btn btn-secondary' onClick={() => navigate("/dashboard")} >Create Room</button>
           </Link>
          </div>
        </main>

    </div> 
  );
}

export default App;
