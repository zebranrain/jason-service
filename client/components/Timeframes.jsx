import React from 'react';

function Timeframes({ changeTimeframe }) {
  return (
    <nav onClick={changeTimeframe}>
      <a>1D</a>
      <a>1W</a>
      <a>1M</a>
      <a>3M</a>
      <a>1Y</a>
      <a>5Y</a>
    </nav>
  )
}

export default Timeframes;