import React from 'react'


export default function SignUpPage(props) {
    return (
        <div className="loginBox">
            <h1>Name:</h1>
            <input type="text" name="signName" id="signName"/>
            <h1>E-mail:</h1>
            <input type="email" name="signEmail" id="signEmail"/>
            <h1>Password:</h1>
            <input type="password" name="signPassword" id="signPassword"/>
            <button onClick={props.signUp} id="signUpBtn" type="button">Register</button>
        </div>
    )   
}
