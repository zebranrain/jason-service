import React from 'react';
import '../styles/Price.scss';
import Odometer from 'react-odometerjs';
import Ticker from './Ticker.jsx';

/* A rolling price component that updates as price changes
(i.e. as the crosshair in the Chart component moves). Presently,
this uses the Odometer library, but ultimately it should be
customized so that each digit moves independently to the next value. */

const Price = function ({ price }) {
  return (
    <div>
      <div className="price">
        <span>$</span>
        <Odometer
          format="(.ddd).dd"
          duration={500}
          value={price}
        />
      </div>
      <Ticker price={price} />
    </div>
  );
};

export default Price;
