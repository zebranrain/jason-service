import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Timeframes from '../components/Timeframes.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Timeframes component", () => {
  test("renders", () => {
    const wrapper = shallow(<Timeframes/>);
    expect(wrapper.exists()).toBe(true);
  });
});