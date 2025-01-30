import { useState } from 'react'
import UserView  from './components/UserView';
import './App.css'
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

const users = [
  {firstName:'Avi', lastname:'Cohen', email:'avic@mail.com', password:'12345'},
  {firstName:'aaa f', lastname:'aaa l', email:'aaa@mail.com', password:'12345'},
  {firstName:'bbb f', lastname:'bbb l', email:'bbb@mail.com', password:'12345'},
  {firstName:'ccc f', lastname:'ccc l', email:'ccc@mail.com', password:'12345'}
]


function App() {


  return (
    <>
     
      <h1>App name</h1>
      <Login/>
      <PostList/>
      <CreatePost/>
      {
        users.map( user => <UserView key={user.email}  user={user} />)
      }
      
      
      
    </>
  )
}

export default App
