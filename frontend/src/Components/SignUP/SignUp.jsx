import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import style from './SignUp.module.css';


const SignUp = () =>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
            {
                navigate('/')
            }else(
                navigate('/signup')
            )
    },[]);

    const collectData= async()=>{
        console.warn(name,email,password);
        let result =await fetch("http://localhost:5000/register",{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/');
    }

    return(
        <div className={style.register}>
            <h1 >Register</h1>
            <input className={style.inputBox} type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input className={style.inputBox} type="text" placeholder='Enter Email'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className={style.inputBox} type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />

            <button onClick={collectData} className={style.button} type="button" >Sign Up</button>
        </div>
    );
}

export default SignUp;