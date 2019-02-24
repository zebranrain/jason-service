import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
// import '../styles/styles.scss';
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

  render() {
    const { pricepoints, company } = this.props;
    return (
      <div>
      <Price price={this.state.crosshairValues[0].y} company={company}/>
      <XYPlot
      onMouseLeave={() => this.setState({crosshairValues: [{}]})}
        width = {1000}
        height = {300} >
        <LineSeries
          data={pricepoints} onNearestX={this.slider}/>
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


