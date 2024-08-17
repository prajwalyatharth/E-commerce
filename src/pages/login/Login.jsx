import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/auth';





const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();


    const Navigate = useNavigate();


    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                localStorage.setItem('token', res?.data?.token);
                setTimeout(() => {
                    Navigate('/')
                }, 2000);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    };

    return (
        <div className='login-page'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
            <Toaster />
            <form className='login-card' onSubmit={handleSumbit}>
                <h2 className='login-title'>Login to Your Account</h2>

                <div className='form-group'>
                    <label className='input-label'>Email</label>
                    <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' />
                </div>

                <div className='form-group'>
                    <label className='input-label'>Password</label>
                    <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
                </div>

                <button className='login-button'>Login</button>

                <div className='register-link'>
                    <span>Don't have an account? <Link to='/register'>Register</Link></span>
                </div>
            </form>
        </div>
    );
}

export default Login
