import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPostRequest, getRequest } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

import { SubmitPostForm } from '../../common/SubmitPostForm/SubmitPostForm';
import { PageHeader } from '../../common/PageHeader/PageHeader.js';

class Component extends React.Component {

  
  render = () => {
    const {className, addPost, request} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <PageHeader title="Add new post" />
        <SubmitPostForm request={request} submitAction={addPost}/>
      </div>
    );
  }
}
Component.propTypes = {
  addPost: PropTypes.func,
  className: PropTypes.string,
  request: PropTypes.object,
};

const mapStateToProps = state => ({
  request: getRequest(state, 'ADD_POST'),
});

const mapDispatchToProps = dispatch => ({
  addPost: arg => dispatch(addPostRequest(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
