import React from 'react';
import { XYPlot, LineSeries, Crosshair, XAxis, YAxis } from 'react-vis';
import '../styles/Chart.scss';
import Price from './Price.jsx';
import moment from 'moment';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [{}]
    };
    this.slider = this.slider.bind(this);
  }

  slider(value, event) {
    this.setState({crosshairValues: [value]});
  }

  setPrice(pricepoints) {
    if (this.state.crosshairValues[0].y) {
      return this.state.crosshairValues[0].y;
    }
    if (pricepoints.length > 1) {
      return pricepoints[0].y;
    }
    return '';
  }

  convertDateToString(timeInMilliseconds) {
    let { timeframe } = this.props;
    if (timeframe === 'day') {
      return `${moment(timeInMilliseconds).format('h:mm a')} ET`;
    }
    if (timeframe === 'week') {
      return `${moment(timeInMilliseconds).format('h:mm a, MMM D')} ET`;
    }
    return moment(timeInMilliseconds).format('MMM D, YYYY');
  }

  render() {
    const { pricepoints, company } = this.props;
    const price = this.setPrice(pricepoints);
    return (
      <div>
      <Price price={price} company={company}/>
      <XYPlot
      onMouseLeave={() => this.setState({crosshairValues: [{}]})}
        width = {1000}
        height = {300}>
        <XAxis title="X Axis" />
        <YAxis title="Y Axis" />
        <LineSeries data={pricepoints} onNearestX={this.slider}/>
        <Crosshair values={this.state.crosshairValues}>
          <div className='crosshair-date'>
            <p>{this.convertDateToString(this.state.crosshairValues[0].z)}</p>
          </div>
        </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;


