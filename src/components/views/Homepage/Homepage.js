import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from '../../common/PageHeader/PageHeader';
import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll, loadPostsRequest} from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';
import { PostsList } from '../../common/PostsList/PostsList';

class Component extends React.Component {
  componentDidMount = () => {
    const {posts, loadPosts} = this.props;
    console.log('posts.length in render: ', posts.length);
    // if (!posts.length) {
    loadPosts(posts);
    // }
  }
  render = () => {
    const {className, posts} = this.props;
    
    return (
      <div className={clsx(className, styles.root)}>
        <PageHeader title="All posts chronologically" />
        <PostsList posts={posts}/>
      </div>
    );
  };
}


/*
const Component = (props) => {  
  const [givenProps] = useState(props);
  useEffect(() => {
    const { posts, loadPosts} = givenProps; 
    console.log('posts.length in render: ', posts.length);
    // if (!posts.length) {
    loadPosts(posts);
    // }
  }, [givenProps]);

  const {className, posts} = props;    
  return (
    <div className={clsx(className, styles.root)}>
      <PageHeader title="All posts chronologically" />
      <PostsList posts={posts}/>
    </div>
  );
};
*/
Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  loadPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state).map(p => ({id: p.id, title: p.title})),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: (payload) => dispatch(loadPostsRequest(payload)),
});

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
