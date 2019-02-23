import React from 'react';
import Chart from './Chart.jsx';
import axios from 'axios';
import Timeframes from './Timeframes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricepoints: [],
      timeframe: 'day'
    };
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }

  getPrices(timeframe) {
    let context = this;
    let { ticker } = this.props.match.params;
    axios.get('/api/prices', {
      params: { ticker, timeframe }
    })
    .then(function(response) {
      let pricepoints = context.formatPrices(response.data);
      context.setState({
        pricepoints
      })
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
        <Chart pricepoints={this.state.pricepoints}/>
        <Timeframes changeTimeframe={this.changeTimeframe}/>
      </div>
    )
  }
}

export default App;