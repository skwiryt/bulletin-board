import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from '../../../redux/userRedux.js';

import { PostEdit } from '../../views/PostEdit/PostEdit';
import { PostAdd } from '../../views/PostAdd/PostAdd';
import { UserPosts } from '../../views/UserPosts/UserPosts';
import { Homepage } from '../../views/Homepage/Homepage';
import { Post } from '../../views/Post/Post';
import { NotFound } from '../../views/NotFound/NotFound';

const Component = ({user}) => (
  <Switch>
    { user.loggedIn && <Route exact path='/userposts/:id' component={UserPosts} /> }
    { user.loggedIn && <Route exact path='/post/add' component={PostAdd} /> }
    { user.loggedIn && <Route exact path='/post/:id/edit' component={PostEdit} /> }    
    <Route exact path='/' component={Homepage} />
    <Route exact path='/post/add' component={NotFound} />
    <Route exact path='/post/:id' component={Post} />
    <Route path='*' component={NotFound} />
  </Switch>);

Component.propTypes = {
  user: PropTypes.object,
};


const mapStateToProps = state => ({
  user: get(state),
});
const Container = connect(mapStateToProps)(Component);
export {
  // Component as Routes,
  Container as Routes,
  Component as RoutesComponent,
};
