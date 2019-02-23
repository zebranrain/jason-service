import React from 'react';
import Chart from './Chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return <Chart/>
  }
}

export default App;