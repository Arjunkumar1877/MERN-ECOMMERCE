import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="nav-logo" className='nav-logo' />
      <img src={navProfile} alt='nav' className='nav-profile'/>
    </div>
  )
}

export default Navbar
