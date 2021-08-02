import React from 'react';
import { shallow } from 'enzyme';
import { RoutesComponent } from './Routes';

describe('Component Routes', () => {
  it('should render without crashing', () => {
    const user = {};
    const component = shallow(<RoutesComponent user={user}/>);
    expect(component).toBeTruthy();
  });
});
