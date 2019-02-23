import React from 'react';
import Chart from './Chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <Chart/>
        <Timeframes timeframe={}/>
      </div>
    )
  }
}

export default App;