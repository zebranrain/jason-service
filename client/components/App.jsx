import React from 'react';
import Chart from './Chart.jsx';
import Timeframes from './Timeframes.jsx';
import Header from './Header.jsx';
import stockPrices from '../services/stockPrices.js';
import translateTimeframe from '../utilities/translateTimeframe.js';
import formatPrices from '../utilities/formatPrices.js';
import setColor from '../utilities/setColor.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricepoints: [],
      timeframe: 'day',
      company: '',
      gain: true
    };
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }

  /* Fetches prices from the server and updates state accordingly
  Invoked on componentDidMount. */

  async getPrices(timeframe) {
    const { ticker } = this.props.match.params;
    const data = await stockPrices(ticker, timeframe);
    const pricepoints = formatPrices(data.prices);
    const company = data.name;
    const gain = pricepoints[pricepoints.length - 1].y > pricepoints[0].y;
    this.setState({
      pricepoints,
      company,
      gain
    });
  }

  /* Click handler that allows the user to change the chart's timeframe.
  Uses the setState callback to fetch prices for the new timeframe */

  changeTimeframe(event) {
    const timeframe = translateTimeframe[event.target.innerText];
    if (timeframe) {
      this.setState({ timeframe }, () => {
        this.getPrices(this.state.timeframe);
      });
    }
  }

  componentDidMount() {
    this.getPrices(this.state.timeframe);
  }

  render() {
    const { pricepoints, company, timeframe, gain } = this.state;
    return (
      <div>
        <Header company={this.state.company} />
        <Chart pricepoints={pricepoints} company={company} timeframe={timeframe} gain={gain} />
        <Timeframes changeTimeframe={this.changeTimeframe} timeframe={timeframe} gain={gain} />
      </div>
    );
  }
}

export default App;
