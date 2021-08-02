import React from 'react';
import { shallow } from 'enzyme';
import { PageHeaderComponent } from './PageHeader';

describe('Component PageHeader', () => {
  it('should render without crashing', () => {
    const component = shallow(<PageHeaderComponent />);
    expect(component).toBeTruthy();
  });
});
