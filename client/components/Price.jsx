import React from 'react';
import '../styles/Price.scss';

function Price({ price }) {
  return (
    <div>
      <div className='price'>{price}</div>
    </div>
  )
}

export default Price;