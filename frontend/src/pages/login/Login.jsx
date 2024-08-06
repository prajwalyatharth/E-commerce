import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


const Login = () => {
    return (
        <div className='register-page '>
            <div className='container'>

                <div className='register-card'>
                    <h2 >Login</h2>
                    <div>
                        <h4 className='input-heading'>Name</h4>
                        <input className='input' type="text" placeholder='write ur name' />
                    </div>
                    <div>
                        <h4 className='input-heading'>Email</h4>
                        <input className='input' type="text" placeholder='write ur email' />
                    </div>

                    <div >
                        <h4 className='input-heading'>Password</h4>
                        <input className='input' type="password" placeholder='write ur password' />
                    </div>

                    <div>
                        <button className='bg-button' style={{ width: "250px" }}>Register</button>

                    </div>

                    <div>
                        <span>If you haven't registered click <Link to='/register'>Register</Link></span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
