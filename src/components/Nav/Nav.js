import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'

// Nav component -- Componente Nav
function Nav(props) {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <nav>
            <ul className='nav-links'>
                <Link style={navStyle} to='/search' onClick={props.search}>
                    <li className='navItems'>Search</li>
                </Link>
                <Link style={navStyle} to='/login' onClick={props.login}>
                    <li className='navItems'>Login</li>
                </Link>
                <Link style={navStyle} to='/register' onClick={props.register}>
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
