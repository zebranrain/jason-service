import React from 'react';
import { XYPlot, LineSeries, Crosshair, MarkSeries } from 'react-vis';
import '../styles/Chart.scss';
import Ticker from './Ticker.jsx';
import Change from './Change.jsx';
import convertDateToString from '../utilities/convertDateToString';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [{}], // initialized with expected data shape, an array with one object
      markerData: [{ x: 1, y: 1, size: 1 }],
      crosshairDisplay: 'block' // toggles between 'block' and 'none' to turn off crosshair when mouse leaves chart
    };
    this.slider = this.slider.bind(this);
  }

  /* Crosshair movement event handler */
  slider(value, event) {
    this.setState({
      crosshairDisplay: 'block',
      crosshairValues: [value],
      markerData: [{ x: value.x, y: value.y, size: 1 }]
    });
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
    const { pricepoints, timeframe } = this.props;
    const openingPrice = pricepoints[0] ? pricepoints[0].y : 0;
    const price = this.setPrice(pricepoints);
    const date = convertDateToString(
      this.state.crosshairValues[0].z,
      timeframe
    );

    const crossLineStyle = {
      line: {
        height: '160px',
        display: this.state.crosshairDisplay
      }
    };

    const toggleVisibility = {
      display: this.state.crosshairDisplay
    };

    return (
      <div>
        <Ticker price={price} />
        <Change openingPrice={openingPrice} currentPrice={price} />
        <XYPlot
          width={676}
          height={196}
          onMouseLeave={() => this.setState({ crosshairValues: [{}], markerData: [{}], crosshairDisplay: 'none' })}
        >
          <LineSeries
            data={pricepoints}
            onNearestX={this.slider}
            color="#21ce99"
          />
          <MarkSeries
            className="mark-series"
            sizeRange={[1, 5]}
            data={this.state.markerData}
            stroke="white"
            fill="#21ce99"
            strokeWidth={2}
            style={toggleVisibility}
          />
          <Crosshair values={this.state.crosshairValues} style={crossLineStyle}>
            <div style={toggleVisibility}>
              <p>{date}</p>
            </div>
          </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;
