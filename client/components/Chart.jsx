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
      markerData: [{ x: null, y: null, size: 1 }],
      crosshairDisplay: 'none' // toggles between 'block' and 'none' to turn off crosshair when mouse leaves chart
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

  /* If the crosshair is visible, show the marker that tracks along with it.
  Otherwise, don't. It would of course be simpler to toggle the CSS display property of the marker,
  but even if it's invisible, its existence affects the x/y scale of the chart. */
  renderMarker(color) {
    if (this.state.crosshairDisplay === 'none') {
      return <div></div>;
    }
    return (
      <MarkSeries
        className="mark-series"
        sizeRange={[1, 5]}
        data={this.state.markerData}
        stroke="white"
        fill={color}
        strokeWidth={2}
      />
    );
  }

  render() {
    const { pricepoints, timeframe, gain } = this.props;
    const openingPrice = pricepoints[0] ? pricepoints[0].y : 0;
    const price = this.setPrice(pricepoints);
    const color = gain ? '#21ce99' : '#f45531';
    const date = convertDateToString(this.state.crosshairValues[0].z, timeframe);

    /* Sets the crosshair to be the full height of the chart
    and respond to the crosshair visibility state property */
    const crossLineStyle = {
      line: {
        height: '210px',
        display: this.state.crosshairDisplay
      }
    };

    const visibility = {
      display: this.state.crosshairDisplay
    };

    /* The MarkSeries comonent below is the dot that moves along the line chart with the crosshair.
    Unfortunately, it can't be rendered as a subcomponent of the crosshair. */

    return (
      <div>
        <Ticker price={price} />
        <Change openingPrice={openingPrice} currentPrice={price} />
        <XYPlot
          width={676}
          height={246}
          onMouseLeave={() => this.setState({ crosshairValues: [{}], crosshairDisplay: 'none' })}
        >
          <LineSeries
            data={pricepoints}
            onNearestX={this.slider}
            color={color}
          />
          {this.renderMarker(color)}
          <Crosshair values={this.state.crosshairValues} style={crossLineStyle}>
            <div style={visibility}>
              <p>{date}</p>
            </div>
          </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;
