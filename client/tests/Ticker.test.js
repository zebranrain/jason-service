import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Ticker from '../components/Ticker.jsx';
import Adapter from 'enzyme-adapter-react-16';
import Odometer from 'react-odometerjs';

Enzyme.configure({ adapter: new Adapter() });

describe('Price component', () => {
  test('renders', () => {
    const wrapper = shallow(<Ticker price={123.00}/>);
    expect(wrapper.exists()).toBe(true);
  });
  test('for prices in hundreds: renders a span element for each digit', () => {
    const wrapper = shallow(<Ticker price={123.00}/>);
    console.log(wrapper.find('.digit').debug());
    expect(wrapper.find('.digit')).toHaveLength(5);
  });
  test('for prices in thousands: renders a span element for each digit', () => {
    const wrapper = shallow(<Ticker price={1234.00}/>);
    console.log(wrapper.find('.digit').debug());
    expect(wrapper.find('.digit')).toHaveLength(6);
  });
});