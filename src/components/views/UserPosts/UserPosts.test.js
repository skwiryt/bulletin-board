import React from 'react';
import { shallow } from 'enzyme';
import { UserPostsComponent } from './UserPosts';

describe('Component UserPosts', () => {
  it('should render without crashing', () => {
    const component = shallow(<UserPostsComponent />);
    expect(component).toBeTruthy();
  });
});
