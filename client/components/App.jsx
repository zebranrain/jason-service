import React from 'react';
import Chart from './Chart.jsx';
import Timeframes from './Timeframes.jsx';
import Header from './Header.jsx';
import stockPrices from '../services/stockPrices.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricepoints: [],
      timeframe: 'day',
      company: ''
    };
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }

  async getPrices(timeframe) {
    let { ticker } = this.props.match.params;
    console.log(stockPrices.toString());
    let data = await stockPrices(ticker, timeframe);
    let pricepoints = this.formatPrices(data.prices);
    let company = data.name;
    this.setState({
      pricepoints,
      company
    });
  }

  changeTimeframe(event) {

    const map = {
      '1D': 'day',
      '1W': 'week',
      '1M': 'month',
      '3M': 'quarter',
      '1Y': 'year',
      '5Y': 'fiveYear'
    }
    this.setState({timeframe: map[event.target.innerText]}, () => {
      this.getPrices(this.state.timeframe)
    });
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

  componentDidMount() {
    this.getPrices(this.state.timeframe);
  }
  render() {
    return (
      <div>
        <Header company={this.state.company}/>
        <Chart pricepoints={this.state.pricepoints} company={this.state.company}/>
        <Timeframes changeTimeframe={this.changeTimeframe}/>
      </div>
    )
  }
}

export default App;