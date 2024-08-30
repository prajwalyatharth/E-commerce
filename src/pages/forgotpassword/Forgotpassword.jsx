import React, { useState } from 'react'

import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';


const Forgotpassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");


    const Navigate = useNavigate();



    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`, { email, newPassword, answer })
            if (res.data.success) {
                toast.success(res.data.message)

                localStorage.setItem('auth', JSON.stringify(res.data));

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
        <div className='login-page'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forgot password</title>
            </Helmet>
            <Toaster />
            <form className='login-card' onSubmit={handleSumbit}>
                <h2 className='login-title'>Reset Password</h2>

                <div className='form-group'>
                    <label className='input-label'>Email</label>
                    <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email' />
                </div>
                <div className='form-group'>
                    <label className='input-label'>What is ur favourite sports?</label>
                    <input className='input' value={answer} onChange={(e) => setAnswer(e.target.value)} type="text" placeholder='Enter your answer' />
                </div>

                <div className='form-group'>
                    <label className='input-label'>Password</label>
                    <input className='input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder='Enter your password' />
                </div>

                <button className='login-button'>Login</button>



            </form>
        </div>
    )
}

export default Forgotpassword
