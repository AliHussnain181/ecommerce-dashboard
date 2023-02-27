import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })

    const handleLogin = async () => {
        let result = await fetch('http://localhost:8000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),

            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        result = await result.json();
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        }
        else {
            alert("please enter correct detail")
        }
    }

    return (
        <div className='login'>
            <input className='inputbox' type='email' placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} required />


            <input className='inputbox' type='password' placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} required />
            <button onClick={handleLogin} className="btn">Login</button>
        </div>
    )
}

export default Login