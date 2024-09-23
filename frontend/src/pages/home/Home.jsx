import React, { useEffect, useState } from 'react';
import './Home.css';
import bg from '../../assets/bgimg.jpg';
import Homefeature from './Homefeature';
import { Helmet } from "react-helmet";
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';


const Home = () => {

  const messages = ['Style', 'Elegance', 'Comfort'];
  const colors = ['#FF0000', '#0000FF', '#008000', '#800080'];

  const [currentFont, setCurrentFont] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setCurrentFont((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(fontInterval);
  }, [messages.length]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColor((prevColor) => (prevColor + 1) % colors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, [colors.length]);

  return (
    <div className='home-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>JustForYOu - Home</title>
      </Helmet>

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className='home-content'>
        <h1 style={{ fontSize: '50px' }}>JustForYou</h1>
        <p>– Where Superiority Meets {messages[currentFont]}</p>

        <div>
          <p style={{ fontSize: '30px' }}>Exclusive Offer</p>
        </div>

        <div>
          <span style={{ fontSize: '40px', fontWeight: 'bold', color: colors[currentColor] }}>60%</span>
        </div>
        <br />

        <Link to="/all-products" style={{ textDecoration: 'none' }}>
          <button className="buy-button">BUY NOW</button>
        </Link>


      </div>
      <img src={bg} alt='' style={{ height: 'auto', width: '100%', marginTop: '40px' }} />
      <Homefeature />

    </div>
  );
};

export default Home;
