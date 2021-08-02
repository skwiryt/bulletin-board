import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Paper } from '@material-ui/core';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PageHeader.module.scss';

const Component = ({className, title}) => (
  <div className={clsx(className, styles.root)}>
    <Paper className={styles.titlePaper}>
      <Typography className={styles.title} variant='h3'>{title}</Typography>
    </Paper>
  </div>
);

Component.propTypes = {
  title: PropTypes.node,
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
  Component as PageHeader,
  // Container as PageHeader,
  Component as PageHeaderComponent,
};
