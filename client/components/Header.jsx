import React from 'react';
import '../styles/Header.scss';

function Header({ company }) {
  return <h1 className='header'>{company}</h1>
}

export default Header;