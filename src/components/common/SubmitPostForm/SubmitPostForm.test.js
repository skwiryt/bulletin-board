import React from 'react';
import { shallow } from 'enzyme';
import { SubmitPostFormComponent } from './SubmitPostForm';

describe('Component SubmitPostForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<SubmitPostFormComponent />);
    expect(component).toBeTruthy();
  });
});
