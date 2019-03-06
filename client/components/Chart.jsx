import React from 'react';
import { XYPlot, LineSeries, Crosshair } from 'react-vis';
import '../styles/Chart.scss';
import Ticker from './Ticker.jsx';
import Change from './Change.jsx';
import convertDateToString from '../utilities/convertDateToString';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [{}] // initialized with expected data shape, an array with one object
    };
    this.slider = this.slider.bind(this);
  }

  /* Crosshair movement event handler */
  slider(value, event) {
    this.setState({ crosshairValues: [value] });
    console.log(event);
  }

  /* Determines the price that should be passed down to the Price component */
  setPrice(pricepoints) {
    if (this.state.crosshairValues[0].y) {
      return this.state.crosshairValues[0].y;
    }
    if (pricepoints.length > 1) {
      return pricepoints[pricepoints.length - 1].y;
    }
    return '';
  }

  render() {
    const { pricepoints, company, timeframe } = this.props;
    const openingPrice = pricepoints[0] ? pricepoints[0].y : 0;
    const price = this.setPrice(pricepoints);
    const date = convertDateToString(
      this.state.crosshairValues[0].z,
      timeframe
    );

    return (
      <div>
        <Ticker price={price} />
        <Change openingPrice={openingPrice} currentPrice={price} />
        <XYPlot
          onMouseLeave={() => this.setState({ crosshairValues: [{}] })}
          width={676}
          height={196}
        >
          <LineSeries
            data={pricepoints}
            onNearestX={this.slider}
            color="#21ce99"
          />
          <Crosshair values={this.state.crosshairValues} style={{ line: { height: '160px' } }}>
            <div>
              <p>{date}</p>
            </div>
          </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;
