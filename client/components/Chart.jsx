import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
import '../styles/styles.scss';
import axios from 'axios';
import Price from './Price.jsx';
import Timeframes from './Timeframes.jsx';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricepoints: [],
      crosshairValues: [{}]
    };
    this.slider = this.slider.bind(this);
  }

  slider(value, event) {
    this.setState({crosshairValues: [value]});
  }

  formatPrices(pricepoints) {
    return pricepoints.map((pricepoint) => {
      let date = new Date(pricepoint.date).getTime();
      return {
        x: date,
        y: pricepoint.price
      }
    })
  }

  getPrices() {
    let context = this;
    axios.get('/prices', {
      params: {
        ticker: 'AAPL',
        timeframe: 'day'
      }
    })
    .then(function(response) {
      let pricepoints = context.formatPrices(response.data);
      context.setState({
        pricepoints
      })
    });
  }

  componentDidMount() {
    this.getPrices();
  }

  render() {
    return (
      <div>
      <Price price={this.state.crosshairValues[0].y}/>
      <XYPlot
      onMouseLeave={() => this.setState({crosshairValues: [{}]})}
        width = {1000}
        height = {300} >
        <LineSeries
          data={this.state.pricepoints} onNearestX={this.slider}/>
        <Crosshair values={this.state.crosshairValues}>
        <div style={{background: 'black'}}>
          <p>{this.state.crosshairValues[0].x}</p>
        </div>
        </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;


