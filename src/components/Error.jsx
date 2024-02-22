import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/Error.png'; // Import the image directly
import {isMobile} from 'react-device-detect';

const Error = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      color: 'white',
    }}>
      <img src={icon} alt="Error" style={{ width: isMobile? '100%':'50%', height: '80%' }} /> {/* Use the icon variable directly */}
      <Link to="/" style={{ textDecoration: 'none', color: 'white', marginTop: '20px',position:'absolute' }}> {/* Adjusted margin */}
        <button style={{ backgroundColor: 'red', color: 'white', width: '200px', height: '80px', borderRadius: '30px' }}>
          <h1>Return to Home</h1>
        </button>
      </Link>
    </div>
  );
};

export default Error;