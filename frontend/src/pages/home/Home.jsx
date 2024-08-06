import React, { useEffect, useState } from 'react';
import './Home.css';
import bg from '../../assets/bgimg.jpg';
import Homefeature from './Homefeature';

const Home = () => {
  const messages = ['Style', 'Elegance', 'Comfort'];
  const colors = ['#FF0000', '#0000FF', '#008000', '#800080'];

  const [currentFont, setCurrentFont] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setCurrentFont((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(fontInterval);
  }, []);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColor((prevColor) => (prevColor + 1) % colors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div className='home-page'>
      <div className='home-content container'>
        <h1 style={{ fontSize: '50px' }}>JustForYou</h1>
        <p>– Where Superiority Meets {messages[currentFont]}</p>

        <div>
          <p style={{ fontSize: '30px' }}>Exclusive Offer</p>
        </div>

        <div>
          <span style={{ fontSize: '40px',fontWeight: 'bold' , color: colors[currentColor] }}>60%</span>
        </div>
        <br />

        <div>
          <button className='buy-button'>BUY NOW</button>
        </div>

      </div>
      <img src={bg} alt='' style={{ height: 'auto', width: '100%', marginTop: '40px' }} />
      <Homefeature/>
    </div>
  );
};

export default Home;
