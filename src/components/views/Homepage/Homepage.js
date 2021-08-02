import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from '../../common/PageHeader/PageHeader';
import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll} from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';
import { PostsList } from '../../common/PostsList/PostsList';

const Component = ({className, posts}) => (
  <div className={clsx(className, styles.root)}>
    <PageHeader title="All posts chronologically" />
    <PostsList posts={posts}/>
  </div>
);

Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state).map(p => ({id: p.id, title: p.title})),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
