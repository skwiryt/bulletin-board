import React from 'react';
import { shallow } from 'enzyme';
import { PageNavComponent } from './PageNav';

describe('Component PageNav', () => {
  it('should render without crashing', () => {
    const user = {};
    const component = shallow(<PageNavComponent user={user} />);
    expect(component).toBeTruthy();
  });
});
