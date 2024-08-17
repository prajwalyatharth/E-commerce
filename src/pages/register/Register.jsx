import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const Navigate = useNavigate();


    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, { name, email, password, phone, address })
            if (res.data.success) {
                toast.success(res.data.message)
                setTimeout(() => {
                    Navigate('/login')
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
        <div className='register-page'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
            <Toaster />
            <form className='register-card ' onSubmit={handleSumbit} >

                <h2 className='register-title'>Register</h2>
                <div className='form-group'>
                    <label className='input-label'>Name</label>
                    <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' required />
                </div>
                <div className='form-group'>
                    <label className='input-label'>Email</label>
                    <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' required />
                </div>
                <div className='form-group'>
                    <label className='input-label'>Password</label>
                    <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' required />
                </div>
                <div className='form-group'>
                    <label className='input-label'>Phone</label>
                    <input className='input' value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Enter your phone number' required />
                </div>
                <div className='form-group'>
                    <label className='input-label'>address</label>
                    <input className='input' value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder='Enter your phone address' required />
                </div>

                <button className='register-button'>Register</button>

                <div className='login-link'>
                    <span>Already have an account? <Link to='/login'>Login</Link></span>
                </div>
            </form>
        </div>
    )
}
export default Register
