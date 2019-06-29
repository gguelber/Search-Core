import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// Nav component -- Componente Nav
function Nav(props) {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }

 

    return (
        <nav>
            <ul className='nav-links'>
                <Link style={navStyle} to='/search' onClick={() => {
                    if (!localStorage.getItem('token')) {
                        Swal.fire({
                            type: 'error',
                            title: 'Please login first',
                          })
                    }
                }}>
                    <li className='navItems'>Search</li>
                </Link>

                <Link style={navStyle} to='/login' onClick={() => {
                    if (localStorage.getItem('token')) {
                        Swal.fire({
                            type: 'error',
                            title: 'You are already logged in',
                          })
                    }
                }}>
                    <li className='navItems'>Login</li>
                </Link>

                <Link style={navStyle} to='/register' onClick={() => {
                    if (localStorage.getItem('token')) {
                        Swal.fire({
                            type: 'error',
                            title: 'Please logout first',
                          })
                    }
                }}>
                    <li className='navItems'>Register</li>
                </Link>
                
                <Link style={navStyle} to='/logout' onClick={props.logout} >
                    <li className='navItems'>Logout</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;
