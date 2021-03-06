import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const post = {};
    const user = {};
    const component = shallow(<PostComponent post={post} user={user}/>);
    expect(component).toBeTruthy();
  });
});
