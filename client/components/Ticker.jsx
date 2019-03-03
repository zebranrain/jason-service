import React from 'react';
import '../styles/Ticker.scss';

/* A rolling price component that updates as price changes
(i.e. as the crosshair in the Chart component moves). Presently,
this uses the Odometer library, but ultimately it should be
customized so that each digit moves independently to the next value. */

const Ticker = function ({ price }) {

  // create an array of digits with comma & period
  const createArrayFromPrice = (price) => {
    if (!price) {
      return [];
    }
    return price.toLocaleString('en-US', { grouping: true, minimumFractionDigits: 2 }).split('');
  };

  const digits = createArrayFromPrice(price);

  const digitDivs = digits.map((value, index) => {

    if (value === '.' || value === ',') {
      return (
        <span className='symbol' key={index}>
          <div>{value}</div>
        </span>
      );
    }

    // convert value to pixel displacement
    value = -(378 - (value * 42));

    return (
      <span className='digit' key={index} style={{ transform: `translateY(${value}px)` }}>
        <div>9</div>
        <div>8</div>
        <div>7</div>
        <div>6</div>
        <div>5</div>
        <div>4</div>
        <div>3</div>
        <div>2</div>
        <div>1</div>
        <div>0</div>
      </span>
    );
  });


  return (
    <div className='ticker'>
      <span className='symbol'>$</span>
      {digitDivs}
    </div>
  );

};

export default Ticker;