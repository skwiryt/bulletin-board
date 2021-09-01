import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const posts = [];
    const loadPosts = () => {};
    const component = shallow(<HomepageComponent posts={posts} loadPosts={loadPosts}/>);
    expect(component).toBeTruthy();
  });
});
