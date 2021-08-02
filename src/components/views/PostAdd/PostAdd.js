import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

import { SubmitPostForm } from '../../common/SubmitPostForm/SubmitPostForm';
import { PageHeader } from '../../common/PageHeader/PageHeader.js';

class Component extends React.Component {

  // to pobierzemy z reduxa do propsów
  addPost = (formData) => {
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  }

  render = () => {
    const {className} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <PageHeader title="Add new post" />
        <SubmitPostForm submitAction={this.addPost}/>
      </div>
    );
  }
}
Component.propTypes = {
  
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
