import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    // manda los datos ingresados por el usuario a traves de la libreria axios al back, el back los proceso y cambia el estado del elemento <p/> en base a la respuesta que da manda el back
    const login = () => {
        const data = {email:email, password:password}
        axios.post("http://localhost:3002/login", data)
        .then((response) => {
            if(!response.data.auth){
                setMessage(response.data.error)
                setLoginStatus(false)
            } else {
                setMessage(response.data.message)
                setLoginStatus(true)
                localStorage.setItem('token', response.data.token)
            }
            
        })
    }
    // hace un pedido al endpoint que valida la autenticacion del usuario a traves de JWT y renderiza el mensaje que llega del back despues de realizar el pedido
    const userAuth = () => {
        axios.get("http://localhost:3002/userAuth", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
        }})
        .then((res) => {
            if(res.data.auth){
                setMessage(res.data.message)
                setAuthenticated(true)
            } else {
                setMessage(res.data.message)
            }
            
        })
    }

    return (
        <div className="login-container d-flex justify-content-center align-items-center flex-column">
                <h1 className="title">Log In</h1>
                <p>{message}</p>
                <label>Email</label>
                <input 
                    className="main-input"
                    type="email" 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label>Password</label>
                <input 
                    className="main-input"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                />
                <button onClick={login} className="main-button" >Log In </button>
                {loginStatus && <button onClick={userAuth} className="auth-button main-button">Authenticate</button>}
                <button className="main-button return-button"><Link to="/" exact={true}>Home</Link></button>
        </div>
    )
}

export default Login