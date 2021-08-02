import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const post = {};
    const component = shallow(<PostEditComponent post={post}/>);
    expect(component).toBeTruthy();
  });
});
