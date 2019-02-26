import React from 'react';
import { XYPlot, LineSeries, Crosshair} from 'react-vis';
import '../styles/Chart.scss';
import Price from './Price.jsx';

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

  render() {
    const { pricepoints, company } = this.props;
    const price = this.setPrice(pricepoints);
    return (
      <div>
      <Price price={price} company={company}/>
      <XYPlot
      onMouseLeave={() => this.setState({crosshairValues: [{}]})}
        width = {1000}
        height = {300} >
        <LineSeries data={pricepoints} onNearestX={this.slider}/>
        <Crosshair values={this.state.crosshairValues}>
          <div className='crosshair-date'>
            <p>{this.state.crosshairValues[0].x}</p>
          </div>
        </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;


