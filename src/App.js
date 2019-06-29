import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SearchPage from './components/SearchPage/SearchPage';
import LoginPage from './LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Swal from 'sweetalert2'

function App() {


  const [isRegistered, setIsRegistered] = useState(false)

  const checkToken = () => {
    if (localStorage.getItem('token')) {
      Swal.fire({
          type: 'success',
          title: 'Success',
        })
      localStorage.clear()
      return (
        <Redirect to="/" />
      )
    } else {
      Swal.fire({
        type: 'error',
        title: 'Please login first',
      })
    }
  }
 



    // Handle Register Button and register new user -- Lida com o botão de cadastro e faz registra o novo usuário
  const handleClickSignUp = async () => {

      //Login input variables --  Referências para os inputs de login
      const nameInput = document.getElementById('signName')
      const emailInput = document.getElementById('signEmail')
      const passInput = document.getElementById('signPassword')
      
      const res = await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: nameInput.value,  
          email: emailInput.value,
          password: passInput.value
      })
      })
      if (res.status === 201) {
        setIsRegistered(true)
        Swal.fire({
              type: 'success',
              title: 'Success!',
              text: 'User Created'
          })
          setTimeout(() => {
            setIsRegistered(false)
          }, 3000)
      }
      if (res.status === 400) {
          Swal.fire({
              type: 'error',
              title: 'Registration Failed',
              text: 'You must fill all fields correctly'
          })
      } 
      if (res.status === 409) {
      Swal.fire({
          type: 'error',
          title: 'Registration Failed',
          text: 'Email already exists'
      })
      } 
      if (res.status === 500) {
      Swal.fire({
          type: 'error',
          title: 'Registration Failed',
          text: 'Internal Error! Please try again'
      })
      } 
  }


  // Routes for the app - Checks for the JWT to decide what to render -- Rotas do app - Checa se há o JWT para decidir o que renderizar 
  return (
    <Router>
      <div className="App">
        <Nav logout={checkToken}/>      
        <Route path="/" exact render={() => {
          return (
            <Redirect to="/login"/>
          )
        }} />            
        <Route path="/login" exact render={() => {
          if (!localStorage.getItem('token')) {
            return (
              <LoginPage />
            )
          } else {
            return (
              <Redirect to="/search" />
            )
          }
        }} />            
        <Route path="/register" exact render={() => {
          if(localStorage.getItem('token')) {
            return (
              <Redirect to="/search" />
            )
          } else if (isRegistered) {
            return (
              <Redirect to="/login" />
            )
          } else {
            return (
              <SignUpPage signUp={handleClickSignUp}/>
            )
          }
        }} />            
        <Route path="/search" render={() => {
          if (localStorage.getItem('token')) {
            return (
              <SearchPage />
            )
          } else {
            return (
              <Redirect to="/login" />
            )
          }
        }} />            
        <Route path="/logout" render={() => {
          if (localStorage.getItem('token')) {
            return (
              <SearchPage />
            )
          } else {
            return (
              <Redirect to="/" />
            )
          }
        }} />            
      </div>
    </Router>
  );
}

export default App;
