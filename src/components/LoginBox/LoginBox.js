import React from 'react'

export default function LoginBox(props) {
    return (
        <div className='loginBox'>
            <h1>Login</h1>
            <form className="loginForm" action="" method="">
                <label htmlFor="email">E-mail:</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"/>
                <button onClick={props.click} type="button">Login</button>
            </form>
        </div>
    )
}
