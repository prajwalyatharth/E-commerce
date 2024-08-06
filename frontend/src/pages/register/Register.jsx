import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='register-page '>
            <div className='container'>
                
                <div className='register-card'>
                    <h2 >Register</h2>
                    <div>
                        <h4 className='input-heading'>Name</h4>
                        <input className='input' type="text" placeholder='write ur name' />
                    </div>
                    <div>
                        <h4 className='input-heading'>Email</h4>
                        <input className='input' type="text" placeholder='write ur email' />
                    </div>
                    <div >
                        <h4 className='input-heading'>Phone</h4>
                        <input className='input' type="text" placeholder='write ur phone number' />
                    </div>
                    <div >
                        <h4 className='input-heading'>Password</h4>
                        <input className='input' type="password" placeholder='write ur phone number' />
                    </div>

                    <div>
                    <button className='bg-button' style={{width:"250px"}}>Register</button>
                    </div>

                    <div>
                        <span>If you have registered click <Link to='/login'>Login</Link></span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Register
