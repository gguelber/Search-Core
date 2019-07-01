import React, { useState, useEffect } from 'react'
import LoginBox from '../LoginBox/LoginBox';
import UserList from '../UserList/UserList';
import SearchPage from '../SearchPage/SearchPage';
import Swal from 'sweetalert2'




// LoginPage react component -- Componente LoginPage

export default function LoginPage() {


const [userList, setUserList] = useState([])
const [isLogged, setIsLogged] = useState(false)



 
// Handle Login Button and login to the account -- Lida com o botão de login e faz o POST request com os dados para obter o JWT do server
const handleClickLogin = async () => {

  //Login input variables --  Referências para os inputs de login
  const emailInput = document.getElementById('email')
  const passInput = document.getElementById('password')
  
  const res = await fetch('http://localhost:3000/api/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passInput.value
    })
  })
 
  try {
    const data = await res.json()
    localStorage.setItem('token', data)
    setIsLogged(true)
    Swal.fire({
      type: 'success',
      title: 'Success!',
      text: 'Welcome to Core'
    })
  } catch (error) {
    console.log(error)
    Swal.fire({
      type: 'error',
      title: 'Login Failed',
      text: 'You cant leave empty fields!'
    })
  }
}


// Fetch registered users on the DB and adds it to the state -- Busca os usuários registrados na DB e adiciona ao state

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/user')
    const data = await res.json()
    setUserList(data)
    
  } catch (error) {
    console.log(error)
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: 'Something went wrong while fetching the users data'
    })
  }
}

// Runs the fetchUsers function when the component mounts and clean the state when it unmounts -- Executa a função fetchUsers() quando o componente é montado e limpa o state quando ele desmonta

useEffect(() => {
  fetchUsers()
}, [])

// Check if the token is on the localStorage to decide which page to render-- Checa se o token está presente no localStorage para decidir qual página deve ser renderizada
  if (isLogged) {
    return (
      <SearchPage />
    )
  }

  return (
    <div>
      <LoginBox click={handleClickLogin}/>
      <UserList users={userList} username={userList.name}/>
    </div>
  )
}
