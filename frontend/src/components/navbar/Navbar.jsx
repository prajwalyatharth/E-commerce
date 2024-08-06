import React from 'react'
import './Navbar.css'
import logo from '../../assets/giraffe.png'
import logo1 from '../../assets/scarf.png'

import { Link } from 'react-router-dom'



const Navbar = () => {
    return (
        <div className='navbar '>
            <div className='navbar container'>
                <div className='navbar-logo-name'>
                    <img src={logo1} alt="" style={{height:'35px'}} />
                    <h3 >JustForYou</h3>
                </div>
            </div>

            <div className='navbar container'>
                <div className='navbar-btn'>
                    <Link  to='/'><div className='normal-button'>Home</div></Link>
                    <Link  to='/'><div className='normal-button'>About</div></Link>
                    <div className='normal-button' >Catagory</div>
                    <Link to='/register'> <button className='bg-button'>Register</button></Link>
                    <Link to = '/login'> <button className='bg-button'>Login</button></Link>
        

                </div>
            </div>

        </div>
    )
}

export default Navbar
