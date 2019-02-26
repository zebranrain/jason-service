import React from 'react';
import '../styles/Timeframes.scss';

function Timeframes({ changeTimeframe }) {
  return (
    <nav onClick={changeTimeframe} className='timeframes'>
      <a className='timeframe'>1D</a>
      <a className='timeframe'>1W</a>
      <a className='timeframe'>1M</a>
      <a className='timeframe'>3M</a>
      <a className='timeframe'>1Y</a>
      <a className='timeframe'>5Y</a>
    </nav>
  );
}

export default Timeframes;