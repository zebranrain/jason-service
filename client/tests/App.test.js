import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import App from '../components/App.jsx';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../../__mocks__/getPrices.js');

Enzyme.configure({ adapter: new Adapter() });

describe("Timeframes component", () => {
  test("renders", () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.exists()).toBe(true);
  });
});

// add mock function for API call