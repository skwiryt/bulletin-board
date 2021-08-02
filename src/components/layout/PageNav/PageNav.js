import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { get } from '../../../redux/userRedux.js';

import styles from './PageNav.module.scss';
import { Button } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';

const Component = ({className, user}) => {
  return (
    <nav className={clsx(className, styles.root)}>
      <Button className={styles.link} exact to={`/`} activeClassName='active' component={NavLink}>Home</Button>

      { !user.loggedIn && <Button className={styles.link} href='https://google.com' component='a'>Log in</Button> }
      { user.loggedIn && <Button className={styles.link} to={`/`} component={Link}>Log out</Button> }       
      { user.loggedIn && <Button className={styles.link} exact to={`/userposts/${user.id}`} activeClassName='active' component={NavLink}>My Posts</Button> }      
    
    </nav>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: get(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as PageNav,
  Container as PageNav,
  Component as PageNavComponent,
};
