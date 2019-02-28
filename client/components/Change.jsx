import React from 'react';
import numeral from 'numeral';
import '../styles/Change.scss';

/* Presents price change information as a percentage and in dollars. */

function Change({ openingPrice, currentPrice }) {
  if (openingPrice) {
    let sign = openingPrice < currentPrice ? '+' : '';
    let dollarChange = sign + numeral(currentPrice - openingPrice).format('$0,0.00');
    let percentageChange = '(' + sign + numeral((currentPrice - openingPrice)/openingPrice).format('0.00%') + ')';

    return (
      <div className='change'>
        <span>{dollarChange}</span>  <span>{percentageChange}</span>
      </div>
    )
  }
  return null
}

export default Change;