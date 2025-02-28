import { useContext } from 'react';
import { Context } from './context/Context';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import ContentView from './components/ContentView';
import Menu from './components/Menu';
import {Routes, Route,} from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';

import './App.css'


function App() {


  return (
    <>
     
      <Menu />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/content" element={<ContentView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <div className="footer">
        <span>Leafs</span>
        <span>(C) 2025</span>
      </div>
    </>
  )
}

export default App
