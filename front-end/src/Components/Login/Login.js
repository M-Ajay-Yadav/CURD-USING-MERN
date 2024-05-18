import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../Alerts/Alerts';
import style from './Login.module.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() =>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }else{
            navigate('/login')
        }
    },[navigate])
    const [alert,setAlert] = useState('')
    const handleLogin = async () => {
        // console.warn(email,password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json()
        console.warn(result);
        if(result.auth)
            {
                localStorage.setItem('user',JSON.stringify(result.auth));
                localStorage.setItem('token',JSON.stringify(result.user));
                navigate('/');
            }else{
                setAlert({ message: 'Incorrect email or password', type: 'error' });
            }

    }
    return (
        <div className={style.Login}>
            <h1>Login</h1>

            <input className={style.inputBox} type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <input className={style.inputBox} type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin} className={style.button}>Login</button>
            {alert && <div class={style.ebox}><Alerts class={style.emessage} message={alert.message} type={alert.type} onClose={() => setAlert(null)} /></div>}

        </div>
    )
}

export default Login;