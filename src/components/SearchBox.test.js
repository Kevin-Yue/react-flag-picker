import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import SearchBox from './SearchBox';
import {Option} from './Option';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  options: ['a', 'b', 'bb'],
  selectedCountries: [],
  onClick: jest.fn(),
  selectorType: 'continent',
  children: <Option/>
};


describe('SearchBox Component', () => {
  test('renders', () => {
    const  wrapper  = shallow(<SearchBox {...props}/>);

    expect(wrapper.exists()).toBe(true);
  });

  test('renders correctly', () => {
    const tree = TestRenderer.create(<SearchBox {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('User input text is echoed', () => {
    const wrapper = shallow(<SearchBox options={[]} />);

    wrapper.find('input').simulate('change', {
      target: { value: 'hello' }
    });

    expect(wrapper.find('input').props().value).toEqual('hello');
  });

  test('should have one input', () => {
    const wrapper = mount(<SearchBox {...props}/>);
    expect(wrapper.find('input').length).toBe(1);
  });

  test('onChange method should be called', () => {
    const wrapper = mount(<SearchBox {...props}/>);
    wrapper.find('input').simulate('change', {
      target: { value: 'b' }
    });
    expect(wrapper.find('li').length).toBe(2);
  });

  test('onClick method should be called', () => {
    const wrapper = mount(<SearchBox {...props}/>);
    wrapper.find('input').simulate('change', {
      target: { value: 'b' }
    });
    wrapper.find('li').at(0).simulate('click');
    expect(props.onClick).toBeCalled();
    expect(wrapper.find('input').props().value).toEqual('');
  });

  
});

