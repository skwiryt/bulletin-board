import React from 'react';
import { shallow } from 'enzyme';
import { PostsListComponent } from './PostsList';

describe('Component PostsList', () => {
  it('should render without crashing', () => {
    const posts = [];
    const user = {};
    const component = shallow(<PostsListComponent user={user} posts={posts}/>);
    expect(component).toBeTruthy();
  });
});
