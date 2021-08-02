import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';
import { SubmitPostForm } from '../../common/SubmitPostForm/SubmitPostForm';
import { PageHeader } from '../../common/PageHeader/PageHeader.js';

class Component extends React.Component {

  // to pobierzemy z reduxa do propsów
  editPost = (formData) => {
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  }

  render = () => {
    const {className, post} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <PageHeader title="Edit your post" />
        <SubmitPostForm post={post} submitAction={this.editPost}/>
      </div>
    );
  }
}

Component.propTypes = {
  post: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getAll(state).find(p => p.id === props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
