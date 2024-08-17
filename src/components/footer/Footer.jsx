import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer-page '>
      <div className='footer-content container p-3  '>
        <div>
          2024 E-Commerce Website. All Rights Reserved.
        </div>
        <div>
          Website created by <span style={{ color: 'black', fontWeight: "bold" }}>Prajwal Kumar</span>
        </div>
      </div>
      <div className='footer-link container d-flex align-items-center justify-content-center gap-5 p-2'>
        <Link>
          <div >About</div>
        </Link>
        |
        <Link>
          <div>Contact Us</div>
        </Link>
        |
        <Link>
          <span>Privacy Policy</span>
        </Link>

      </div>


    </div>
  )
}

export default Footer
