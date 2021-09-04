import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from '../../common/PageHeader/PageHeader';
import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll, loadPostsRequest} from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';
import { PostsList } from '../../common/PostsList/PostsList';

/*
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
*/

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
const Component = (props) => {

  const fetchPosts = () => {
    const { posts, loadPosts} = props; 
    console.log('posts.length in render: ', posts.length);    
    loadPosts(posts);
  };

  useEffect(fetchPosts, []);

  const {className, posts} = props;    
  return (
    <div className={clsx(className, styles.root)}>
      <PageHeader title="All posts chronologically" />
      <PostsList posts={posts}/>
    </div>
  );
};

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

/*
Żeby nie było pętli (a nawet przy wstawieniu warunku na length będzie kilka bo przywoływana funkcja jest za każdym razem nowym obiektem),
idzie o to, żeby useEffect odpalił tylko jeden raz. Można dać useEffect(callback, []), 
ale eslint wywala jeśli w callbacku są zależności nie wymienione w tablicy.
Trzy rozwiązania wykombinowałem.
1. Najfajniejsze, żeby ten callback był zmienną, wtedy eslint się nie buntuje.
2. Można po prostu wyłączyć eslint dając // eslint-disable-next-line react-hooks/exhaustive-deps
3. Podać w tablicy kopię propsów wcześniej zapisaną w stanie. I z tej kopii pobrać zależności w callbacku.
*/
