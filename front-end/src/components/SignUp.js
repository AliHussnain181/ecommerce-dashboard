import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState(false)
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const collectData = async () => {
        let result = await fetch('http://localhost:8000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json()
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));

        if (result) {
            navigate('/')
        }

    }


    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputbox" required type='text' value={name}
                onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputbox" required type='email' value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

            <input className="inputbox" required type='password'  value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'  />

            <button onClick={collectData} type='submit' className="btn">Sign Up</button>
        </div>
    )
}

export default SignUp