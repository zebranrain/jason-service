import React from 'react';
import '../styles/Ticker.scss';

// map digits to an array of their y transform values
// return a 'digit' div, using the y value of that digit
//

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

    if (value === '.') {
      return (
        <span className='digit' key={index}>
          <div>.</div>
        </span>
      );
    }

    if (value === ',') {
      return (
        <span className='digit' key={index}>
          <div>,</div>
        </span>
      );
    }

    // convert value to pixel displacement
    value *= -20;

    return (
      <span className='digit' style={{ transform: `translateY(${value}px)` }} key={index}>
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </span>
    );
  });


  return (
    <div className='ticker'>
      <span className='digit'>$</span>
      {digitDivs}
    </div>
  );

};

export default Ticker;