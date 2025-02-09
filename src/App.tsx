

import './App.css'
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import ContentView from './components/ContentView';
import Menu from './components/Menu';
import {Routes, Route,} from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';


// const users = [
//   {firstName:'Avi', lastname:'Cohen', email:'avic@mail.com', password:'12345'},
//   {firstName:'aaa f', lastname:'aaa l', email:'aaa@mail.com', password:'12345'},
//   {firstName:'bbb f', lastname:'bbb l', email:'bbb@mail.com', password:'12345'},
//   {firstName:'ccc f', lastname:'ccc l', email:'ccc@mail.com', password:'12345'}
// ]


function App() {


  return (
    <>
     
      <h1>App name</h1>
      <Menu />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/content" element={<ContentView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  )
}

export default App
