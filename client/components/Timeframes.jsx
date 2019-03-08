import React from 'react';
import '../styles/Timeframes.scss';

const Timeframes = function ({ changeTimeframe, timeframe, gain }) {

  const direction = gain ? 'up' : 'down';

  return (
    <nav onClick={changeTimeframe} className='timeframes'>
      <a className={`timeframe ${direction}`} id={timeframe === 'day' ? `selected-${direction}` : ''}>1D</a>
      <a className={`timeframe ${direction}`} id={timeframe === 'week' ? `selected-${direction}` : ''}>1W</a>
      <a className={`timeframe ${direction}`} id={timeframe === 'month' ? `selected-${direction}` : ''}>1M</a>
      <a className={`timeframe ${direction}`} id={timeframe === 'quarter' ? `selected-${direction}` : ''}>3M</a>
      <a className={`timeframe ${direction}`} id={timeframe === 'year' ? `selected-${direction}` : ''}>1Y</a>
      <a className={`timeframe ${direction}`} id={timeframe === 'fiveYear' ? `selected-${direction}` : ''}>5Y</a>
    </nav>
  );
};

export default Timeframes;