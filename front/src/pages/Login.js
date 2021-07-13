import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const login = () => {
        const data = {email:email, password:password}
        axios.post("http://localhost:3002/login", data)
        .then((response) => {
            console.log(response.data)
            if(response.data.error){
                setMessage(response.data.error)
            } else {
                setMessage(response.data.message)
            }
            
        })
    }

    return (
        <div className="login-container d-flex justify-content-center align-items-center flex-column">
                <h1 className="title">Iniciar Sesion</h1>
                <p>{message}</p>
                <input 
                    className="main-input"
                    type="email" 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <input 
                    className="main-input"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                />
                <button onClick={login} className="main-button" >Iniciar Sesion</button>
                <button className="main-button return-button"><Link to="/" exact={true}>Volver al Inicio</Link></button>
        </div>
    )
}

export default Login